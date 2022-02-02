package output

import (
	"context"

	"github.com/ungerik/go3d/float64/vec2"
)

type Location struct {
	SubscriberId int64
	Offset       vec2.T
	OpenLocationCode string
}

type Request struct {
	SubscriberId int64
	Domain       string
}

type Purchase struct {
	SubscriberId int64
	Vendor       string
}

type Batch interface {
	PartitionId() int
	Locations() []Location
	Requests() []Request
	Purchases() []Purchase
}

type Writer interface {
	// Write will encode and store the provided batch in a location.
	// The batch is guaranteed to not be reused after Write returns.
	Write(context.Context, Batch) error
}
