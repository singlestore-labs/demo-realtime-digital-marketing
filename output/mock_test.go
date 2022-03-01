package output

import (
	"math/rand"
	"s2cellular/data"
	"s2cellular/util"

	"github.com/ungerik/go3d/float64/vec2"
)

type MockBatch struct {
	partitionId int
	seqId       int64
	locs        []Location
	reqs        []Request
	purs        []Purchase
}

func NewMockBatch(rnd *util.RandGen, partitionId int, size int) *MockBatch {
	locs := make([]Location, size)
	reqs := make([]Request, size)
	purs := make([]Purchase, size)

	for i := 0; i < size; i++ {
		vendor := data.ChooseVendor(rnd.Next())

		offset := vec2.T{rand.Float64(), rand.Float64()}
		locs[i] = Location{
			SubscriberId: int64(i),
			Offset:       offset,
		}
		reqs[i] = Request{
			SubscriberId: int64(i),
			Domain:       vendor.Domain,
		}
		purs[i] = Purchase{
			SubscriberId: int64(i),
			Vendor:       vendor.Name,
		}
	}

	return &MockBatch{
		partitionId: partitionId,
		seqId:       0,
		locs:        locs,
		reqs:        reqs,
		purs:        purs,
	}
}

func (m MockBatch) PartitionId() int {
	return m.partitionId
}

func (m MockBatch) SeqId() int64 {
	return m.seqId
}

func (m MockBatch) Locations() []Location {
	return m.locs
}

func (m MockBatch) Requests() []Request {
	return m.reqs
}

func (m MockBatch) Purchases() []Purchase {
	return m.purs
}
