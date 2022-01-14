# subscribers table

Need to add the subscribers table back because calculating the unique set of subscribers along with last notification + current location is too expensive to do on the fly.

When we receive locations we will need to upsert into this table.
When we generate notifications we will need to update this table.

# segmentation

Handling dynamic criteria within the matching algorithm is too expensive. Need to precompute segment memberships which offers can use instead.

- create segments and subscriber_segments tables
- subscriber_segments will contain a JSON array of segment IDs
- need high performance "contains" UDF
  - returns true if lower is completely contained by upper
  - `json_contains_array(upper JSON, lower JSON) -> bool`
- need a segmentation matching query to update the subscriber_segments table
- this query will need to run frequently as data changes

# matching

Once we have segmentation, offers should be modified to contain a list of segment IDs. The matching algorithm will need to use json_contains_array to filter offers.

# frontend framework

- talks to singlestore via HTTP API
- will manage pipelines dynamically
- ingest rates
- map visualization
  - live notifications showing up on map
- customers management
- offer management
- offer report
