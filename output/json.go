package output

import (
	"encoding/json"
	"io"
)

type JSONEncoder struct {
}

func (e *JSONEncoder) Extension() string {
	return "json"
}

func (e *JSONEncoder) EncodeLocations(rows []Location, w io.Writer) error {
	enc := json.NewEncoder(w)
	for i := range rows {
		if err := enc.Encode(&rows[i]); err != nil {
			return err
		}
	}
	return nil
}

func (e *JSONEncoder) EncodeRequests(rows []Request, w io.Writer) error {
	enc := json.NewEncoder(w)
	for i := range rows {
		if err := enc.Encode(&rows[i]); err != nil {
			return err
		}
	}
	return nil
}

func (e *JSONEncoder) EncodePurchases(rows []Purchase, w io.Writer) error {
	enc := json.NewEncoder(w)
	for i := range rows {
		if err := enc.Encode(&rows[i]); err != nil {
			return err
		}
	}
	return nil
}
