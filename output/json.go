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

func (e *JSONEncoder) EncodeLocations(seqId int64, rows []Location, w io.Writer) error {
	enc := json.NewEncoder(w)
	obj := map[string]interface{}{
		"seqId":        nil,
		"subscriberid": nil,
		"offsetX":      nil,
		"offsetY":      nil,
	}

	for i := range rows {
		obj["seqId"] = seqId
		obj["subscriberid"] = rows[i].SubscriberId
		obj["offsetX"] = rows[i].Offset[0]
		obj["offsetY"] = rows[i].Offset[1]

		if err := enc.Encode(obj); err != nil {
			return err
		}
	}
	return nil
}

func (e *JSONEncoder) EncodeRequests(seqId int64, rows []Request, w io.Writer) error {
	enc := json.NewEncoder(w)
	obj := map[string]interface{}{
		"seqId":        nil,
		"subscriberid": nil,
		"domain":       nil,
	}

	for i := range rows {
		obj["seqId"] = seqId
		obj["subscriberid"] = rows[i].SubscriberId
		obj["domain"] = []byte(rows[i].Domain)

		if err := enc.Encode(obj); err != nil {
			return err
		}
	}
	return nil
}

func (e *JSONEncoder) EncodePurchases(seqId int64, rows []Purchase, w io.Writer) error {
	enc := json.NewEncoder(w)
	obj := map[string]interface{}{
		"seqId":        nil,
		"subscriberid": nil,
		"vendor":       nil,
	}

	for i := range rows {
		obj["seqId"] = seqId
		obj["subscriberid"] = rows[i].SubscriberId
		obj["vendor"] = []byte(rows[i].Vendor)
		if err := enc.Encode(obj); err != nil {
			return err
		}
	}
	return nil
}
