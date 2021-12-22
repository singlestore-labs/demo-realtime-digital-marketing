package output

import (
	"fmt"
	"s2cellular/util"
	"time"
)

type ExtensionGenerator func(Batch, BatchEncoder) string

func NewExtensionGenerator(rnd util.RandWithSource) ExtensionGenerator {
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
