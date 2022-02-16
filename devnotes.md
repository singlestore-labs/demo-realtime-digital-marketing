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

- overview page
  - render offer polygons? something like showing all of the offers on a map might be a good way to explain offers
    - create offer modal (can reuse on other page - build offer form separate from model)
      - should support loading & editing an existing offer
    - draw offer on polygon
    - when defining a segment should show num matching subscribers in real time
    - give one or two examples of offers + segments
  - segmentation
    - update segments button with time taken
    - provide estimate of how much work it needs to do based on the data
    - viz could be pick a segment and specify number of matching subscribers
      - or a bar chart of segments/num subscribers
  - matching
    - explain matching
    - match button with time taken
    - show table of last notifications sent & amount paid & offer id
- map page
  - stats: num subscribers, num offers, num cities, num segments
  - line graphs: locations, requests, purchases, notifications
  - duration stats: update segments, run matching process
  - offer creator
  - visualize offers on the map?
