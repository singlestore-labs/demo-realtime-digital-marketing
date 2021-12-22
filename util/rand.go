package util

import (
	"math/rand"

	"github.com/ungerik/go3d/float64/vec2"
)

type RandGen struct {
	rnd *rand.Rand
}

type RandWithSource struct {
	*rand.Rand
	rand.Source
}

func NewRandGen(seed int64) *RandGen {
	return &RandGen{
		rnd: rand.New(rand.NewSource(seed)),
	}
}

func (g *RandGen) Next() RandWithSource {
	s := rand.NewSource(g.rnd.Int63())
	r := rand.New(s)
	return RandWithSource{
		Rand:   r,
		Source: s,
	}
}

func (g *RandGen) List(n int) []RandWithSource {
	out := make([]RandWithSource, n)
	for i := 0; i < n; i++ {
		out[i] = g.Next()
	}
	return out
}

type RandInterface interface {
	Float64() float64
	Intn(int) int
}

// SampleUnitCircle picks a random point on the unit circle
func SampleUnitCircle(rnd RandInterface) vec2.T {
	return vec2.T{rnd.Float64() - 0.5, rnd.Float64() - 0.5}
}

func RandomBetween(rnd RandInterface, a, b float64) float64 {
	return (rnd.Float64() * (b - a)) + a
}

func RandomVelocity(rnd RandInterface, from, to *vec2.T, min, max float64) vec2.T {
	v := vec2.Sub(to, from)
	v.Scale(RandomBetween(rnd, min, max))
	return v
}
