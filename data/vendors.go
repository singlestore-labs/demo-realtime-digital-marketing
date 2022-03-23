package data

import (
	_ "embed"
	"encoding/json"
	"math"
	"sort"
	"strings"
	"subscriber-sim/util"
)

type Vendor struct {
	Id       int
	Name     string
	Domain   string
	Category string
	CDF      float64
}

var (
	//go:embed vendors.json
	vendors_raw    []byte
	vendorMaxTotal int
	Vendors        []Vendor
)

func ChooseVendor(rnd util.RandInterface) *Vendor {
	r := rnd.Intn(vendorMaxTotal) + 1
	i := sort.Search(len(Vendors), func(i int) bool {
		return int(Vendors[i].CDF) >= r
	})
	if i < len(Vendors) {
		return &Vendors[i]
	}
	return nil
}

func init() {
	var vendors []struct {
		Id       int
		Vendor   string
		Tld      string
		Category string
		CDF      float64
	}

	err := json.Unmarshal(vendors_raw, &vendors)
	if err != nil {
		panic(err)
	}

	Vendors = make([]Vendor, 0, len(vendors))

	for _, v := range vendors {
		Vendors = append(Vendors, Vendor{
			Id:       v.Id,
			Name:     v.Vendor,
			Domain:   strings.ToLower(v.Vendor) + "." + v.Tld,
			Category: v.Category,
			CDF:      v.CDF,
		})
	}

	vendorMaxTotal = int(math.Ceil(Vendors[len(Vendors)-1].CDF))
}
