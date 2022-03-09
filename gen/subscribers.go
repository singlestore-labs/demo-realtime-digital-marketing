package gen

import (
	"subscriber-sim/util"

	"github.com/ungerik/go3d/float64/vec2"
)

type Subscriber struct {
	Id int64

	Location       vec2.T
	Velocity       vec2.T
	TargetLocation vec2.T

	LastRequestDomain  string
	LastPurchaseVendor string
}

func InitSubscribers(state *State, count int) {
	state.Subscribers = make([]Subscriber, count)
	offset := count * state.PartitionId

	for i := 0; i < count; i++ {
		loc := util.SampleUnitCircle(state.Rand)
		tgt := util.SampleUnitCircle(state.Rand)
		velocity := util.RandomVelocity(
			state.Rand,
			&loc,
			&tgt,
			state.MinSpeed,
			state.MaxSpeed,
		)

		state.Subscribers[i] = Subscriber{
			Id:             int64(offset + i),
			Location:       loc,
			Velocity:       velocity,
			TargetLocation: tgt,
		}
	}
}
