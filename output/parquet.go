package output

import (
	"io"

	goparquet "github.com/fraugster/parquet-go"
	"github.com/fraugster/parquet-go/parquet"
	"github.com/fraugster/parquet-go/parquetschema"
)

func mustCreateSchemaDefinition(s string) *parquetschema.SchemaDefinition {
	schema, err := parquetschema.ParseSchemaDefinition(s)
	if err != nil {
		panic(err)
	}
	return schema
}

var (
	parquetBaseOptions = []goparquet.FileWriterOption{
		goparquet.WithCompressionCodec(parquet.CompressionCodec_SNAPPY),
		goparquet.WithDataPageV2(),
	}

	parquetLocationOptions = append(parquetBaseOptions,
		goparquet.WithSchemaDefinition(mustCreateSchemaDefinition(`
			message location {
				required int64 seqid;
				required int64 subscriberid;
				required double offsetX;
				required double offsetY;
			}
		`)),
	)

	parquetRequestOptions = append(parquetBaseOptions,
		goparquet.WithSchemaDefinition(mustCreateSchemaDefinition(`
			message request {
				required int64 seqid;
				required int64 subscriberid;
				required binary domain (STRING);
			}
		`)),
	)

	parquetPurchaseOptions = append(parquetBaseOptions,
		goparquet.WithSchemaDefinition(mustCreateSchemaDefinition(`
			message purchase {
				required int64 seqid;
				required int64 subscriberid;
				required binary vendor (STRING);
			}
		`)),
	)
)

type ParquetEncoder struct {
}

func (e *ParquetEncoder) Extension() string {
	return "parquet"
}

func (e *ParquetEncoder) EncodeLocations(seqId int64, rows []Location, w io.Writer) error {
	fw := goparquet.NewFileWriter(w, parquetLocationOptions...)
	obj := map[string]interface{}{
		"seqid":        nil,
		"subscriberid": nil,
		"offsetX":      nil,
		"offsetY":      nil,
	}

	for i := range rows {
		obj["seqid"] = seqId
		obj["subscriberid"] = rows[i].SubscriberId
		obj["offsetX"] = rows[i].Offset[0]
		obj["offsetY"] = rows[i].Offset[1]

		if err := fw.AddData(obj); err != nil {
			return err
		}
	}

	return fw.Close()
}

func (e *ParquetEncoder) EncodeRequests(seqId int64, rows []Request, w io.Writer) error {
	fw := goparquet.NewFileWriter(w, parquetRequestOptions...)
	obj := map[string]interface{}{
		"seqid":        nil,
		"subscriberid": nil,
		"domain":       nil,
	}

	for i := range rows {
		obj["seqid"] = seqId
		obj["subscriberid"] = rows[i].SubscriberId
		obj["domain"] = []byte(rows[i].Domain)

		if err := fw.AddData(obj); err != nil {
			return err
		}
	}

	return fw.Close()
}

func (e *ParquetEncoder) EncodePurchases(seqId int64, rows []Purchase, w io.Writer) error {
	fw := goparquet.NewFileWriter(w, parquetPurchaseOptions...)
	obj := map[string]interface{}{
		"seqid":        nil,
		"subscriberid": nil,
		"vendor":       nil,
	}

	for i := range rows {
		obj["seqid"] = seqId
		obj["subscriberid"] = rows[i].SubscriberId
		obj["vendor"] = []byte(rows[i].Vendor)

		if err := fw.AddData(obj); err != nil {
			return err
		}
	}

	return fw.Close()
}
