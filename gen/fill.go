package gen

import "s2cellular/output"

type Batch struct {
	partitionId int
	locations   []output.Location
	requests    []output.Request
	purchases   []output.Purchase
}

func NewBatch(state *State) *Batch {
	return &Batch{
		partitionId: state.PartitionId,
		locations:   make([]output.Location, len(state.Subscribers)),
		requests:    make([]output.Request, len(state.Subscribers)),
		purchases:   make([]output.Purchase, len(state.Subscribers)),
	}
}

func (b *Batch) PartitionId() int {
	return b.partitionId
}

func (b *Batch) Locations() []output.Location {
	return b.locations
}

func (b *Batch) Requests() []output.Request {
	return b.requests
}

func (b *Batch) Purchases() []output.Purchase {
	return b.purchases
}

func FillBatch(state *State, batch *Batch) {
	// we need to scale up the slices here since we don't know at this point how
	// many requests/purchases there are in the batch
	batch.requests = batch.requests[:len(state.Subscribers)]
	batch.purchases = batch.purchases[:len(state.Subscribers)]

	numRequests := 0
	numPurchases := 0

	for i := range state.Subscribers {
		subscriber := &state.Subscribers[i]

		batch.locations[i].SubscriberId = subscriber.Id
		batch.locations[i].Offset[0] = subscriber.Location[0]
		batch.locations[i].Offset[1] = subscriber.Location[1]
		batch.locations[i].Seq++

		if subscriber.LastRequestDomain != "" {
			batch.requests[numRequests].SubscriberId = subscriber.Id
			batch.requests[numRequests].Domain = subscriber.LastRequestDomain
			numRequests++
		}

		if subscriber.LastPurchaseVendor != "" {
			batch.purchases[numPurchases].SubscriberId = subscriber.Id
			batch.purchases[numPurchases].Vendor = subscriber.LastPurchaseVendor
			numPurchases++
		}
	}

	batch.requests = batch.requests[:numRequests]
	batch.purchases = batch.purchases[:numPurchases]
}
