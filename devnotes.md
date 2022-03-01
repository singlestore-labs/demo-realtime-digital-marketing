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

- offer creation modal/page
  - consider creating the form separate so it can be used on a page or modal
    - should support loading & editing an existing offer
  - draw offer polygon on map
  - when defining a segment should show num matching subscribers in real time
  - give one or two examples of offers + segments
- map page
  - offer creator
- optimize seed data gen for offers/segments

# replace absolute time with relative

"Simulation Epoch"

Rather than using real timestamps, use relative timestamps from the beginning of the simulation epoch (seconds since sim epoch)

Schema changes

- subscribers last notification -> bigint & copy from locations
- locations, requests, purchases -> bigint
  - at ingest set to sim epoch + offset
  - sim epoch looked up and configured in the pipeline
  - when pipeline is reset, need to also reset the sim epoch
  - alternatively, could lookup in procedure
    - actually..... is it possible to have a UDF to compute SIM_NOW()?
    - UDF could be dynamically created at SIM start
- notifications -> calculate sim epoch when matching algo runs
- eliminate month from segments since it's not an absolute measurement
- notifications map -> track sim epoch rather than ts

queries.ts

- truncate timeseries is still sorta f'ed
  - if you let the pipeline run out (truncation off) and then turn it on a couple hours later, we will truncate too much since we don't take into account the gap between min and max ts
  - perhaps it's best to do some kind of binary search
