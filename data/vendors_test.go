package data

import (
	_ "embed"
	"math/rand"
	"reflect"
	"testing"
)

func TestChooseVendor(t *testing.T) {
	type args struct {
		rnd *rand.Rand
	}
	tests := []struct {
		name string
		args args
		want *Vendor
	}{
		{"verify that ChooseVendor returns a random vendor", args{rand.New(rand.NewSource(1234))}, &Vendor{
			Id:       403,
			Name:     "Twitterwire",
			Domain:   "twitterwire.gov",
			Category: "books",
			CDF:      216760,
		}},
		{"different seed different vendor", args{rand.New(rand.NewSource(5))}, &Vendor{
			Id:       675,
			Name:     "InnoZ",
			Domain:   "innoz.com",
			Category: "tools",
			CDF:      218500,
		}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := ChooseVendor(tt.args.rnd); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("ChooseVendor() = %v, want %v", got, tt.want)
			}
		})
	}
}
