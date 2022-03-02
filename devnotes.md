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

# crazy idea: replace absolute time with relative

"Simulation Epoch"

Rather than using real timestamps, use relative timestamps from the beginning of the simulation epoch (seconds since sim epoch).

I tried building this... and ended up running into something that looked like a bug. Basically it's either tricky or impossible to ensure that offset in the pipeline is correct. Need to rethink this idea later, using absolute time is fine for now.