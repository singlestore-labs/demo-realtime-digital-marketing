package data

import (
	_ "embed"
	"math/rand"
	"testing"
)

func TestChooseVendor(t *testing.T) {
	// Test that ChooseVendor returns a vendor from the top 100 list
	rnd := rand.New(rand.NewSource(1234))
	vendor := ChooseVendor(rnd)

	if vendor == nil {
		t.Error("ChooseVendor() returned nil")
	}

	// Verify the vendor is in the expected CDF range (1-100 for top100 list)
	if vendor.CDF < 1 || vendor.CDF > 100 {
		t.Errorf("ChooseVendor() returned vendor with CDF %v, expected 1-100", vendor.CDF)
	}

	// Verify different seeds give different results
	vendor2 := ChooseVendor(rand.New(rand.NewSource(5678)))
	if vendor2 == nil {
		t.Error("ChooseVendor() with different seed returned nil")
	}
}
