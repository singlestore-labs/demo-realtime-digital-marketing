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
			Id:       52,
			Name:     "Yodel",
			Domain:   "yodel.com",
			Category: "automotive",
		}},
		{"different seed different vendor", args{rand.New(rand.NewSource(5))}, &Vendor{
			Id:       704,
			Name:     "Kayveo",
			Domain:   "kayveo.org",
			Category: "computers",
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
