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

Need to update subscribers.last_notification as well as write out the notifications.

# frontend framework

- talks to singlestore via HTTP API
- will manage pipelines dynamically
- ingest rates
- map visualization
  - live notifications showing up on map
- customers management
- offer management
- offer report

# Notification streaming to frontend

- make sure we always query for notifications in the viewport otherwise issues with getting notifications happening elsewhere + limit
- notification list view renders notifications as a stream of locations and offer ids
  - hovering a notification queries for details on the notification
  - clicking a notification jumps the map to the notification
    - re-pings the map with potentially a different color?

# Reminders

- Check TODOs
- configure pipeline size?
- configure database partitions?
