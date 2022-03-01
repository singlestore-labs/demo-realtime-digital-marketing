package output

import (
	"io"
)

type BatchEncoder interface {
	Extension() string
	EncodeLocations(int64, []Location, io.Writer) error
	EncodeRequests(int64, []Request, io.Writer) error
	EncodePurchases(int64, []Purchase, io.Writer) error
}
