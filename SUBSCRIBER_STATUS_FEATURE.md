# Subscriber Status Feature Documentation

## Overview

This feature adds persistent red/green status dots to the map that visualize real-time subscriber relevance for marketing campaigns. The dots show whether subscribers have fresh location data and are within campaign zones.

## Status Semantics

### Color Meanings
- **GREEN**: Subscriber has fresh location data (≤30 seconds old) AND is within a campaign's notification zone
- **RED**: Subscriber has stale location data (>30 seconds old) OR is outside campaign zones

### Status Reasons
The system provides four detailed status reasons:
- `fresh_and_in_zone`: Location data is fresh AND subscriber is inside the campaign zone
- `stale`: Location data is older than 30 seconds
- `out_of_scope`: Location data is fresh but subscriber is outside all campaign zones
- `stale_and_out_of_scope`: Both conditions - data is stale AND subscriber is out of zone

### Freshness Threshold
The freshness threshold is **30 seconds** by default. This is defined in:
- SQL: `subscriber_status_in_bounds()` function in `sql/schema.sql` (parameter default)
- Frontend: `FRESHNESS_THRESHOLD` constant in `web/src/render/useStatusDotsRenderer.ts`

To change the threshold:
1. Update the SQL function default parameter
2. Update the frontend constant to match
3. Reset the database schema

## Database Setup

### For New Databases
Run the standard setup flow from the Dashboard UI. The new schema includes:
- `locations.event_ts` - timestamp when the simulator generated the event
- `locations.ingested_at` - timestamp when the database processed the event
- `subscriber_status_in_bounds()` function - computes status for subscribers in map bounds

### For Existing Databases (Migration)
If you have an existing database with old schema:

```sql
-- Add new columns
ALTER TABLE locations ADD COLUMN event_ts DATETIME(6);
ALTER TABLE locations ADD COLUMN ingested_at DATETIME(6);

-- Backfill ingested_at from existing ts column
UPDATE locations SET ingested_at = ts;

-- Drop old ts column
ALTER TABLE locations DROP COLUMN ts;

-- Recreate indexes
ALTER TABLE locations ADD SORT KEY (ingested_at);
ALTER TABLE locations ADD KEY (event_ts) USING HASH;

-- Add the status function
-- (Copy the subscriber_status_in_bounds function from sql/schema.sql and execute it)
```

**Important**: Old Parquet files without `event_ts` will fail pipeline ingestion. You must:
1. Stop pipelines: `STOP ALL PIPELINES`
2. Drop pipelines: `DROP PIPELINE locations`, `DROP PIPELINE requests`, `DROP PIPELINE purchases`
3. Regenerate data with the new simulator
4. Recreate pipelines from the UI

## Data Generation

### Regenerating Data with Event Timestamps
The simulator now includes event timestamps in location records:

```bash
# Build the simulator
go build -o simulator ./cmd/simulator/main.go

# Generate data (example with 100k subscribers, S3 output)
./simulator \
  -blob "s3://your-bucket/realtime-digital-marketing/100k" \
  -format parquet \
  -subscribers 100000 \
  -partitions 8 \
  -iterations 100
```

The simulator generates `event_ts` as microseconds since epoch when the location event is created.

## Testing the Feature

### Manual Testing Steps

1. **Start the application locally**
   ```bash
   cd web
   npm run dev
   ```

2. **Setup database** (if not already done)
   - Navigate to Dashboard
   - Click "Setup Database" button
   - Enable the simulator

3. **Verify green dots appear**
   - Green dots should appear for subscribers with fresh location data inside campaign zones
   - Hover over a green dot to see tooltip with:
     - Subscriber ID
     - Offer ID
     - Status: GREEN
     - Reason: Fresh And In Zone
     - Age: (should be < 30 seconds)
     - Fresh: Yes
     - In Zone: Yes

4. **Verify red dots appear**
   - Red dots should appear for subscribers outside zones or with stale data
   - Stop the simulator and wait 30+ seconds
   - Existing dots should turn from green to red as data ages
   - Hover to verify status reason changes to "Stale"

5. **Test all four status combinations**
   
   To test **fresh_and_in_zone** (green):
   - Ensure simulator is running
   - Look at areas covered by campaign zones
   
   To test **stale** (red):
   - Stop the simulator
   - Wait 35 seconds
   - All dots should turn red with reason "Stale" or "Stale And Out Of Scope"
   
   To test **out_of_scope** (red):
   - Look at map areas outside campaign notification zones
   - Even with fresh data, these should be red with reason "Out Of Scope"
   
   To test **stale_and_out_of_scope** (red):
   - Stop simulator
   - Wait 35 seconds
   - Look at areas outside campaign zones

6. **Verify notification pulses still work**
   - Purple notification pulses should still appear and fade
   - Pulses should appear on top of status dots
   - Both systems should operate independently

### Testing Status Query Directly

You can test the status query directly in the SingleStore client:

```sql
-- Check status for subscribers in a specific area
-- Replace the polygon coordinates with your map bounds
SELECT *
FROM subscriber_status_in_bounds(
  ST_GeomFromText('POLYGON((-74.1 40.6, -73.9 40.6, -73.9 40.8, -74.1 40.8, -74.1 40.6))'),
  30  -- freshness threshold in seconds
)
LIMIT 10;
```

Expected columns:
- `city_id`, `subscriber_id`, `offer_id`
- `latitude`, `longitude`
- `event_ts`, `evaluated_at`, `age_seconds`
- `is_fresh`, `within_zone`
- `status` ('green' or 'red')
- `status_reason`

### Missing event_ts Handling

If old data without `event_ts` exists:

```sql
-- Check for NULL event_ts
SELECT COUNT(*) FROM locations WHERE event_ts IS NULL;

-- These will appear as RED with reason "stale"
SELECT *
FROM subscriber_status_in_bounds(
  ST_GeomFromText('POLYGON((-74.1 40.6, -73.9 40.6, -73.9 40.8, -74.1 40.8, -74.1 40.6))'),
  30
)
WHERE event_ts IS NULL;
```

## Files Changed

### Simulator (Go)
- `output/writer.go` - Added `EventTs int64` field to Location struct
- `gen/fill.go` - Generate timestamp when filling batch (time.Now().UnixMicro())
- `output/parquet.go` - Added `eventts` to Parquet schema and encoding

### Database (SQL)
- `sql/schema.sql` - Added event_ts column, renamed ts to ingested_at, added subscriber_status_in_bounds() function
- `sql/procedures.sql` - Updated process_locations to accept and convert event_ts (FROM_UNIXTIME)
- `sql/pipelines.sql` - Map event_ts from Parquet field

### Frontend (TypeScript/React)
- `web/src/data/queries.ts` - Added SubscriberStatus type and querySubscriberStatus() function
- `web/src/render/useStatusDotsRenderer.ts` - New renderer for persistent status dots with tooltips
- `web/src/render/useCombinedRenderer.ts` - Combines status dots and notification pulses
- `web/src/pages/Dashboard.tsx` - Use combined renderer and display legend

## Known Limitations

1. **Old Data Incompatibility**: Parquet files generated before this change do not have `event_ts` and will cause pipeline errors. Must regenerate data.

2. **Hosted Data**: If using hosted S3 data (e.g., `s3://singlestore-realtime-digital-marketing/`), that data must be regenerated to include event timestamps. Until then, pipelines will fail.

3. **Performance**: The status query scans recent locations for all subscribers in map bounds. For very large datasets (millions of active subscribers), consider:
   - Adding a time filter to only check recent locations
   - Materializing status in a view
   - Adjusting REFRESH_INTERVAL if map rendering lags

4. **Freshness Threshold**: The 30-second threshold works well for the simulator's default cadence. If simulator batch frequency changes significantly, adjust the threshold accordingly.

5. **Tooltip Positioning**: Tooltips currently render at a fixed position. A more sophisticated implementation could track mouse position for better UX.

## Demo Narrative

When showing this feature:

> "Green means SingleStore has fresh location data and the subscriber is currently relevant to the campaign. Red means the decision is stale, the subscriber is outside the campaign zone, or both. The important point is that both freshness and geospatial relevance are evaluated against the live data path."

Key talking points:
- Event timestamps come from the simulator (not database NOW())
- Freshness is calculated as difference between event time and query time
- Geographic relevance uses SingleStore's GEOGRAPHY_CONTAINS against campaign zones
- Both criteria are evaluated in real-time in the database
- The combination shows when a subscriber is a "hot lead" for a campaign

## Troubleshooting

### No dots appear on map
- Check that database is initialized and simulator is running
- Verify that campaign offers exist: `SELECT COUNT(*) FROM offers WHERE enabled = TRUE`
- Check locations table: `SELECT COUNT(*) FROM locations`
- Verify event_ts is populated: `SELECT COUNT(*) FROM locations WHERE event_ts IS NOT NULL`

### All dots are red
- Check freshness: `SELECT MAX(event_ts), NOW(6), TIMESTAMPDIFF(SECOND, MAX(event_ts), NOW(6)) FROM locations`
- If age > 30 seconds, simulator may have stopped or data is stale
- Restart simulator to generate fresh location events

### Dots don't update
- Check browser console for query errors
- Verify status query runs successfully in database client
- Check network tab - should see requests every 2 seconds to the API

### Pipeline fails after upgrade
- Old Parquet files lack event_ts field
- Stop and drop pipelines
- Regenerate data with new simulator version
- Recreate pipelines from UI
