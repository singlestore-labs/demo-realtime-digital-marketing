package gen

import (
	"s2cellular/util"
)

type State struct {
	PartitionId int
	SeqId       int64
	Rand        util.RandWithSource
	Subscribers []Subscriber

	PurchaseProb float64
	RequestProb  float64

	MinSpeed float64
	MaxSpeed float64
}
