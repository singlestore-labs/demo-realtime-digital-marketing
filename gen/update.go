package gen

import (
	"s2cellular/data"
	"s2cellular/util"

	"github.com/ungerik/go3d/float64/vec2"
)

// UpdateSubscribers updates each subscriber's location, last request, and last
// purchase
func UpdateSubscribers(state *State) {
	for i := range state.Subscribers {
		subscriber := &state.Subscribers[i]

		// if the distance to the target is less than or equal to our velocity
		// we need to pick a new target location and velocity
		d := vec2.Sub(&subscriber.TargetLocation, &subscriber.Location)
		if d.Length() <= subscriber.Velocity.Length() {
			subscriber.TargetLocation = util.SampleUnitCircle(state.Rand)
			subscriber.Velocity = util.RandomVelocity(
				state.Rand,
				&subscriber.Location,
				&subscriber.TargetLocation,
				state.MinSpeed,
				state.MaxSpeed,
			)
		} else {
			// otherwise, move towards the target location
			subscriber.Location.Add(&subscriber.Velocity)
		}

		r := state.Rand.Float64()

		if state.RequestProb > r {
			vendor := data.ChooseVendor(state.Rand)
			subscriber.LastRequestDomain = vendor.Domain
		} else {
			subscriber.LastRequestDomain = ""
		}

		if state.PurchaseProb > r {
			vendor := data.ChooseVendor(state.Rand)
			subscriber.LastPurchaseVendor = vendor.Name
		} else {
			subscriber.LastPurchaseVendor = ""
		}
	}
}
