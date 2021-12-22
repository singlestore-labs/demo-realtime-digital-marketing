package output

import (
	"context"

	"gocloud.dev/blob"
)

type BlobWriter struct {
	bucket *blob.Bucket
	enc    BatchEncoder
	genExt ExtensionGenerator
}

func NewBlobWriter(bucket *blob.Bucket, enc BatchEncoder, genExt ExtensionGenerator) *BlobWriter {
	return &BlobWriter{
		bucket: bucket,
		enc:    enc,
		genExt: genExt,
	}
}

func (w *BlobWriter) Write(ctx context.Context, batch Batch) error {
	extension := w.genExt(batch, w.enc)

	writer, err := w.bucket.NewWriter(ctx, "locations"+extension, &blob.WriterOptions{})
	if err != nil {
		return err
	}
	err = w.enc.EncodeLocations(batch.Locations(), writer)
	if err != nil {
		return err
	}
	err = writer.Close()
	if err != nil {
		return err
	}

	writer, err = w.bucket.NewWriter(ctx, "requests"+extension, &blob.WriterOptions{})
	if err != nil {
		return err
	}
	err = w.enc.EncodeRequests(batch.Requests(), writer)
	if err != nil {
		return err
	}
	err = writer.Close()
	if err != nil {
		return err
	}

	writer, err = w.bucket.NewWriter(ctx, "purchases"+extension, &blob.WriterOptions{})
	if err != nil {
		return err
	}
	err = w.enc.EncodePurchases(batch.Purchases(), writer)
	if err != nil {
		return err
	}
	err = writer.Close()
	if err != nil {
		return err
	}

	return nil
}
