package main

import (
	"context"
	"flag"
	"log"
	"os"
	"s2cellular/gen"
	"s2cellular/output"
	"s2cellular/util"
	"time"

	"gocloud.dev/blob/fileblob"
)

var outDir = flag.String("output", "/tmp/s2cellular", "set the output dir")

func main() {
	flag.Parse()

	rnd := util.NewRandGen(time.Now().UnixNano())
	genExt := output.NewExtensionGenerator(rnd.Next())
	ctx := context.Background()

	err := os.MkdirAll(*outDir, os.ModePerm)
	if err != nil {
		log.Fatal(err)
	}

	b, err := fileblob.OpenBucket(*outDir, &fileblob.Options{
		Metadata: fileblob.MetadataDontWrite,
	})
	if err != nil {
		log.Fatal(err)
	}
	defer b.Close()

	bw := output.NewBlobWriter(b, &output.JSONEncoder{}, genExt)

	state := &gen.State{
		PartitionId: 0,
		Rand:        rnd.Next(),

		PurchaseProb: 0.5,
		RequestProb:  0.5,

		MinSpeed: 0.001,
		MaxSpeed: 0.01,
	}

	gen.InitSubscribers(state, 100000)

	batch := gen.NewBatch(state)

	for i := 0; i < 10; i++ {
		gen.UpdateSubscribers(state)
		gen.FillBatch(state, batch)

		err = bw.Write(ctx, batch)
		if err != nil {
			log.Fatal(err)
		}
	}
}
