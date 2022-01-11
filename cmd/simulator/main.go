package main

import (
	"context"
	"flag"
	"log"
	"s2cellular/gen"
	"s2cellular/output"
	"s2cellular/util"
	"sync"
	"time"

	"gocloud.dev/blob"

	_ "gocloud.dev/blob/azureblob"
	_ "gocloud.dev/blob/fileblob"
	_ "gocloud.dev/blob/gcsblob"
	_ "gocloud.dev/blob/s3blob"
)

var (
	blobURL = flag.String("blob", "file:///tmp/s2cellular?metadata=skip", "blob URL (see https://gocloud.dev/howto/blob/#services for url syntax)")
	seed    = flag.Int64("seed", time.Now().UnixNano(), "set the seed")
	format  = flag.String("format", "json", "output format (json, parquet)")

	numPartitions  = flag.Int("partitions", 1, "number of partitions")
	numSubscribers = flag.Int("subscribers", 100000, "number of subscribers")

	purchaseProb = flag.Float64("purchase-prob", 0.5, "purchase probability")
	requestProb  = flag.Float64("request-prob", 0.5, "request probability")

	minSpeed = flag.Float64("min-speed", 0.001, "minimum speed")
	maxSpeed = flag.Float64("max-speed", 0.01, "maximum speed")

	iterations   = flag.Int("iterations", 10, "number of iterations")
	progressFreq = flag.Int("progress-freq", 10, "frequency of progress reports (0 disables)")
)

func main() {
	flag.Parse()

	var batchEncoder output.BatchEncoder
	switch *format {
	case "json":
		batchEncoder = &output.JSONEncoder{}
	case "parquet":
		batchEncoder = &output.ParquetEncoder{}
	default:
		log.Fatalf("unknown format: '%s'", *format)
	}

	if *numPartitions < 1 {
		log.Fatalf("invalid number of partitions: %d", *numPartitions)
	}
	if *numSubscribers < 1 {
		log.Fatalf("invalid number of subscribers: %d", *numSubscribers)
	}

	rnd := util.NewRandGen(*seed)
	genExt := output.NewExtensionGenerator(rnd.Next())
	ctx := context.Background()

	b, err := blob.OpenBucket(ctx, *blobURL)
	if err != nil {
		log.Fatal(err)
	}
	defer b.Close()

	bw := output.NewBlobWriter(b, batchEncoder, genExt)

	subsPerPartition := *numSubscribers / *numPartitions

	wg := &sync.WaitGroup{}

	startTime := time.Now()

	for i := 0; i < *numPartitions; i++ {
		wg.Add(1)

		go func(partitionid int) {
			defer wg.Done()

			state := &gen.State{
				PartitionId: partitionid,
				Rand:        rnd.Next(),

				PurchaseProb: *purchaseProb,
				RequestProb:  *requestProb,

				MinSpeed: *minSpeed,
				MaxSpeed: *maxSpeed,
			}
			gen.InitSubscribers(state, subsPerPartition)

			batch := gen.NewBatch(state)

			for i := 0; i < *iterations; i++ {
				gen.UpdateSubscribers(state)
				gen.FillBatch(state, batch)

				err = bw.Write(ctx, batch)
				if err != nil {
					log.Fatal(err)
				}

				if *progressFreq > 0 && (i+1)%(*progressFreq) == 0 {
					log.Printf("partition %d: %d/%d complete", partitionid, i+1, *iterations)
				}
			}
		}(i)
	}

	wg.Wait()

	duration := time.Since(startTime)

	log.Printf("finished in %s", duration)
	log.Printf("%.2f batches per second", float64(*iterations**numPartitions)/duration.Seconds())
}
