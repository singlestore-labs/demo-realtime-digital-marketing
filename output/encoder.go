package output

import (
	"io"
)

type BatchEncoder interface {
	Extension() string
	EncodeLocations([]Location, io.Writer) error
	EncodeRequests([]Request, io.Writer) error
	EncodePurchases([]Purchase, io.Writer) error
}
