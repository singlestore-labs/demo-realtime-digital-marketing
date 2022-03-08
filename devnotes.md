# frontend framework

- ingest rates
- map visualization
  - live notifications showing up on map
- customers management
- offer management
- offer report

# overview page

Idea is to make it a kind of walk through with steps. Ideally, each step has some kind of interaction combined with a basic visualization.

Schema -> render list of tables along with status icon
Pipelines -> render number of cities, number of pipelines, and ingest throughput
Segmentation -> show some kind of viz linking subscribers to segments
Matching -> sample notifications generated

# Reminders

- Check TODOs
- configure pipeline size?
- configure database partitions?

# helpful links

- draw a polygon
  https://www.keene.edu/campus/maps/tool/
- lookup a plus code
  https://plus.codes/map

# next steps:

- enable workspaces support
- group offers by polygon in map
- pick default scale based on number of partitions after create database
- incrementally compute subscriber_segments table
- offer creation modal/page
  - consider creating the form separate so it can be used on a page or modal
    - should support loading & editing an existing offer
  - draw offer polygon on map
  - when defining a segment should show num matching subscribers in real time
  - give one or two examples of offers + segments
- map page
  - offer creator
- rows / second rather than cumulative (search code: SQL_CLUSTER_THROUGHPUT)

# crazy idea: replace absolute time with relative

"Simulation Epoch"

Rather than using real timestamps, use relative timestamps from the beginning of the simulation epoch (seconds since sim epoch).

I tried building this... and ended up running into something that looked like a bug. Basically it's either tricky or impossible to ensure that offset in the pipeline is correct. Need to rethink this idea later, using absolute time is fine for now.

# idea: incrementally compute subscriber_segments table

Currently the subscriber_segments table is recomputed in it's entirety which will not scale well as the data size increases.

As an alternative, it should be possible to compute the table incrementally.

Consider when each subscriber_segment "enters" and "leaves" the table.

Insert process: select from timeseries table where ts > last_update_ts
Record "exit_time" in subscribers_segments based on filter_interval (on the segment)
Update exit_time each time we insert into the table (with the max exit_time)

Delete process: delete subscriber_segments with exit time <= now
