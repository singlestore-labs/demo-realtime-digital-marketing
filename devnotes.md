# helpful links

- draw a polygon
  https://www.keene.edu/campus/maps/tool/
- lookup a plus code
  https://plus.codes/map

# next steps:

- add an option to follow a specific subscriber
- group offers by polygon in map
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
