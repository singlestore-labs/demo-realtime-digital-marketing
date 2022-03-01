package output

import (
	"fmt"
	"time"
)

type ExtensionGenerator func(Batch, BatchEncoder) string

func NewExtensionGenerator() ExtensionGenerator {
	// seq ensures we don't generate two files at the exact same nanosecond
	seq := 0

	return func(batch Batch, enc BatchEncoder) string {
		seq++
		t := time.Now().UTC()

		return fmt.Sprintf(
			".%04d-%02d-%02d.%02d%02d%02d.%09d.%04d.%s",
			t.Year(),
			t.Month(),
			t.Day(),
			t.Hour(),
			t.Minute(),
			t.Second(),
			t.Nanosecond()+seq,
			batch.PartitionId(),
			enc.Extension(),
		)
	}
}
