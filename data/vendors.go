package data

import (
	_ "embed"
	"encoding/json"
	"subscriber-sim/util"
	"sort"
	"strings"
)

type Vendor struct {
	Id       int
	Name     string
	Domain   string
	Category string
}

var (
	//go:embed vendors.json
	vendors_raw    []byte
	vendorTotals   []int
	vendorMaxTotal int
	Vendors        []Vendor
)

func ChooseVendor(rnd util.RandInterface) *Vendor {
	r := rnd.Intn(vendorMaxTotal) + 1
	i := sort.Search(len(vendorTotals), func(i int) bool {
		return vendorTotals[i] >= r
	})
	if i < len(vendorTotals) {
		return &Vendors[i]
	}
	return nil
}

func init() {
	var vendors []struct {
		Id         int
		Vendor     string
		Tld        string
		Category   string
		Popularity float64
	}

	err := json.Unmarshal(vendors_raw, &vendors)
	if err != nil {
		panic(err)
	}

	// sort vendors by popularity
	sort.Slice(vendors, func(i, j int) bool {
		return vendors[i].Popularity < vendors[j].Popularity
	})

	vendorTotals = make([]int, 0, len(vendors))
	Vendors = make([]Vendor, 0, len(vendors))

	runningTotal := 0
	for _, v := range vendors {
		Vendors = append(Vendors, Vendor{
			Id:       v.Id,
			Name:     v.Vendor,
			Domain:   strings.ToLower(v.Vendor) + "." + v.Tld,
			Category: v.Category,
		})

		runningTotal += int((v.Popularity * 1000))
		vendorTotals = append(vendorTotals, runningTotal)
	}

	vendorMaxTotal = runningTotal
}
