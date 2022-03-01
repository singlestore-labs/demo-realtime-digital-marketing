package output

import (
	"context"
	"fmt"
	"io"
	"s2cellular/util"
	"testing"

	"gocloud.dev/blob"
	_ "gocloud.dev/blob/memblob"
)

func TestBlobWriter(t *testing.T) {
	rnd := util.NewRandGen(0)
	genExt := NewExtensionGenerator()

	ctx := context.Background()
	b, err := blob.OpenBucket(ctx, "mem://")
	if err != nil {
		t.Fatal(err)
	}
	defer b.Close()

	jsonWriter := NewBlobWriter(b, &JSONEncoder{})

	batch := NewMockBatch(rnd, 0, 1000)

	err = jsonWriter.Write(ctx, batch, genExt)
	if err != nil {
		t.Fatal(err)
	}

	iter := b.List(nil)
	count := 0
	for {
		obj, err := iter.Next(ctx)
		if err == io.EOF {
			break
		}
		if err != nil {
			t.Fatal(err)
		}

		fmt.Println(obj.Key)
		count++
	}

	if count != 3 {
		t.Fatalf("expected 3 files, got %d", count)
	}
}
