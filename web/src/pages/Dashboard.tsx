import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import * as React from "react";
import { BsEye, BsInfoCircleFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";

import { EnableSimulatorWarning } from "@/components/EnableSimulatorButton";
import { IngestChart, useIngestChartData } from "@/components/IngestChart";
import { PixiMap } from "@/components/PixiMap";
import { SetupDatabaseButton } from "@/components/SetupDatabaseButton";
import { Stats } from "@/components/Stats";
import { SELECTABLE_CITIES_DATA } from "@/data/constants";
import { useUpdateCityList } from "@/data/models/useUpdateCityList";
import { City } from "@/data/queries";
import {
  connectionConfig,
  isUpdatingCities,
  mapViewMode,
  selectedCities as selectedCitiesFromRecoil,
  selectedCity,
  simulatorEnabled,
} from "@/data/recoil";
import { useCombinedRenderer } from "@/render/useCombinedRenderer";
import { useConnectionState } from "@/view/hooks/hooks";
import { useSimulationMonitor } from "@/view/hooks/useSimulationMonitor";
import { useSimulator } from "@/view/hooks/useSimulator";

const RealtimeChart = () => {
  const config = useRecoilValue(connectionConfig);
  const ingestData = useIngestChartData(
    config,
    "locations",
    "requests",
    "purchases",
    "notifications",
    "subscriber_segments"
  );
  return (
    <>
      <Stack spacing={4}>
        <Stack spacing={3}>
          <Stack spacing={2}>
            <Heading fontSize="xl">Key Metrics</Heading>
            <Text>Real-time campaign delivery to audience segments</Text>
          </Stack>
        </Stack>
        <Stats />
      </Stack>
      <Stack border="1px solid silver" borderRadius="10px" padding="15px">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" fontWeight="bold">
            INGESTED DATA
          </Text>
          <Flex
            justifyContent="space-between"
            gap={2}
            fontSize="xs"
            alignItems="center"
            color={useColorModeValue("#820DDF", "#ECE8FD")}
          >
            <Icon as={BsInfoCircleFill} />{" "}
            <Text>Hover over graph for schema details</Text>
          </Flex>
        </Flex>
        <SimpleGrid>
          <IngestChart data={ingestData} yAxisLabel="total rows" height={170} />
        </SimpleGrid>
      </Stack>
    </>
  );
};

const SelectCityCheckbox = (props: {
  isUpdating: boolean;
  totalSelectableCities: Array<City>;
}) => {
  const [selectedCities] = useRecoilState(selectedCitiesFromRecoil);
  const { onCreateCity, onRemoveCity } = useUpdateCityList();
  const { colorMode } = useColorMode();
  const [lastSelectedCityId, setLastSelectedCityId] =
    useRecoilState(selectedCity);

  const getNewSelectedCityAfterDeletion = (city: City): number => {
    const cityIndex = selectedCities.findIndex((c) => c.id === city.id);
    if (cityIndex === 0 && selectedCities.length > 1) {
      return SELECTABLE_CITIES_DATA[1].id;
    }
    return -1;
  };

  const getCheckedFontColor = (city: City) => {
    if (selectedCities.map((c) => c.id).includes(city.id)) {
      if (colorMode === "light") {
        return "purple.500";
      } else {
        return "purple.200";
      }
    }
    return undefined;
  };

  const CityNameContainer: React.FC<{ city: City }> = ({ city }) => {
    let selectedCityIndicator;
    if (lastSelectedCityId === city.id && selectedCities.length > 0) {
      selectedCityIndicator = (
        <span style={{ display: "inline", position: "absolute", right: "0px" }}>
          <BsEye size="1.2em" />
        </span>
      );
    }
    return (
      <>
        <Text>{city.name}</Text>
        {selectedCityIndicator}
      </>
    );
  };

  const setCheckItem = (city: City, checkStatus: boolean) => {
    if (checkStatus) {
      onCreateCity(city.centerLat, city.centerLon);
      setLastSelectedCityId(city.id);
    } else {
      const numOfSelectedCities = selectedCities.length;
      if (numOfSelectedCities > 0) {
        setLastSelectedCityId(getNewSelectedCityAfterDeletion(city));
      } else {
        setLastSelectedCityId(-1);
      }
      onRemoveCity(city.id);
    }
  };

  return (
    <SimpleGrid minChildWidth="25%" spacing={[1, 3]}>
      {props.totalSelectableCities.map((city) => (
        <Checkbox
          size="md"
          disabled={props.isUpdating}
          key={city.id}
          zIndex={10}
          colorScheme="purple"
          isChecked={selectedCities.map((c) => c.id).includes(city.id)}
          onChange={(e) => setCheckItem(city, e.target.checked)}
        >
          <Flex
            justifyContent="left"
            alignItems="center"
            gap={1}
            color={getCheckedFontColor(city)}
          >
            <CityNameContainer city={city} />
          </Flex>
        </Checkbox>
      ))}
    </SimpleGrid>
  );
};

const StatsWrapper = () => {
  const [selectedCities] = useRecoilState(selectedCitiesFromRecoil);
  const [isUpdating] = useRecoilState(isUpdatingCities);
  const [lastSelectedCityId, setLastSelectedCityId] =
    useRecoilState(selectedCity);
  const [totalSelectableCities, setTotalSelectableCities] =
    React.useState(selectedCities);

  React.useEffect(() => {
    const selectableCityIds = SELECTABLE_CITIES_DATA.map((c) => c.id);
    const unknownSelectedCities = selectedCities.filter(
      (c) => !selectableCityIds.includes(c.id)
    );
    setTotalSelectableCities([
      ...SELECTABLE_CITIES_DATA,
      ...unknownSelectedCities,
    ]);
    if (lastSelectedCityId === -1 && selectedCities.length > 0) {
      setLastSelectedCityId(selectedCities[0].id);
    }
  }, [selectedCities, lastSelectedCityId, setLastSelectedCityId]);

  return (
    <>
      <Stack spacing={4}>
        <Stack spacing={3}>
          <Stack spacing={2}>
            <Heading fontSize="xl">Locations</Heading>
            <Text overflowWrap="break-word">
              Select cities to add to the dataset
            </Text>
          </Stack>
        </Stack>
        <Tooltip
          isDisabled={!isUpdating}
          label="Updating city list"
          hasArrow
          placement="top"
          zIndex={5}
        >
          <SelectCityCheckbox
            isUpdating={isUpdating}
            totalSelectableCities={totalSelectableCities}
          />
        </Tooltip>
        <br />
      </Stack>
      <RealtimeChart />
    </>
  );
};

export const Dashboard = () => {
  const { connected, initialized } = useConnectionState();
  const enabled = useRecoilValue(simulatorEnabled);
  const [viewMode, setViewMode] = useRecoilState(mapViewMode);
  const config = useRecoilValue(connectionConfig);
  useSimulationMonitor(enabled && connected && initialized);
  useSimulator(enabled && connected && initialized);
  const [isSmallScreen] = useMediaQuery("(max-width: 640px)");

  // Call hooks unconditionally at the top
  const legendBg = useColorModeValue("white", "gray.800");
  const dotBorderColor = useColorModeValue("white", "gray.700");
  const toggleBg = useColorModeValue("gray.100", "gray.700");
  const activeBg = useColorModeValue("purple.500", "purple.400");

  // Avoid unused variable warning
  void config;

  /*const generateDemoData = React.useCallback(async () => {
    setGeneratingDemo(true);
    try {
      console.log(
        "[Demo Mode] Creating offers and demo data for all cities..."
      );

      // Define all cities with their coordinates and OLC codes
      const cities = [
        {
          id: 120658,
          name: "New York",
          lon: -74.006,
          lat: 40.714,
          olc: "87G8Q23C+",
        },
        {
          id: 4658,
          name: "Sydney",
          lon: 151.207,
          lat: -33.868,
          olc: "4RRH49J2+",
        },
        {
          id: 45042,
          name: "London",
          lon: -0.126,
          lat: 51.509,
          olc: "9C3XGV5C+",
        },
        { id: 37679, name: "Paris", lon: 2.349, lat: 48.853, olc: "8FW4V83C+" },
        {
          id: 33174,
          name: "Barcelona",
          lon: 2.159,
          lat: 41.389,
          olc: "8FH49QR5+",
        },
        {
          id: 49551,
          name: "Hong Kong",
          lon: 114.175,
          lat: 22.278,
          olc: "7PJP75HF+",
        },
        {
          id: 68449,
          name: "Tokyo",
          lon: 139.692,
          lat: 35.69,
          olc: "8Q7XMMRR+",
        },
        {
          id: 103513,
          name: "Singapore",
          lon: 103.85,
          lat: 1.29,
          olc: "6PH57VR2+",
        },
        { id: 14, name: "Dubai", lon: 55.171, lat: 25.066, olc: "7HQQ358C+" },
      ];

      // First, create offers for each city (notification zones around city center)
      for (const city of cities) {
        console.log(
          `[Demo Mode] Creating offer for ${city.name} at (${city.lon}, ${city.lat})`
        );
        const result = await Exec(
          config,
          `
          INSERT INTO offers (customer, enabled, notification_zone, segment_ids, notification_content, notification_target, maximum_bid_cents)
          VALUES (
            'Demo Campaign - ${city.name}',
            TRUE,
            GEOGRAPHY_POLYGON(
              'POLYGON((
                ${city.lon - 0.02} ${city.lat - 0.02},
                ${city.lon + 0.02} ${city.lat - 0.02},
                ${city.lon + 0.02} ${city.lat + 0.02},
                ${city.lon - 0.02} ${city.lat + 0.02},
                ${city.lon - 0.02} ${city.lat - 0.02}
              ))'
            ),
            '[]',
            'Special offer in ${city.name}!',
            'https://example.com/${city.name.toLowerCase().replace(" ", "-")}',
            500
          )
          ON DUPLICATE KEY UPDATE enabled = TRUE
        `
        );
        console.log(
          `[Demo Mode] Created offer for ${city.name}, affected rows:`,
          result
        );
      }

      console.log("[Demo Mode] Created offers for all cities");

      // Now create location data for subscribers in each city
      for (let i = 0; i < cities.length; i++) {
        const city = cities[i];
        const baseSubId = 2000 + i * 100; // Ensure unique IDs: 2000, 2100, 2200, etc.
        console.log(
          `[Demo Mode] Creating locations for ${city.name}, city_id=${
            city.id
          }, subscribers ${baseSubId + 1}-${baseSubId + 5}`
        );

        const locationValues = [
          `(${city.id}, ${baseSubId + 1}, NOW(6), NOW(6), GEOGRAPHY_POINT(${
            city.lon
          } + RAND()*0.01, ${city.lat} + RAND()*0.01), '${city.olc}')`,
          `(${city.id}, ${baseSubId + 2}, NOW(6), NOW(6), GEOGRAPHY_POINT(${
            city.lon
          } + RAND()*0.01, ${city.lat} + RAND()*0.01), '${city.olc}')`,
          `(${city.id}, ${baseSubId + 3}, NOW(6), NOW(6), GEOGRAPHY_POINT(${
            city.lon
          } + RAND()*0.01, ${city.lat} + RAND()*0.01), '${city.olc}')`,
          `(${city.id}, ${baseSubId + 4}, NOW(6), NOW(6), GEOGRAPHY_POINT(${
            city.lon
          } + RAND()*0.01, ${city.lat} + RAND()*0.01), '${city.olc}')`,
          `(${city.id}, ${baseSubId + 5}, NOW(6), NOW(6), GEOGRAPHY_POINT(${
            city.lon
          } + RAND()*0.01, ${city.lat} + RAND()*0.01), '${city.olc}')`,
        ].join(",\n          ");

        const result = await Exec(
          config,
          `
          INSERT INTO locations (city_id, subscriber_id, event_ts, ingested_at, lonlat, olc_8)
          VALUES ${locationValues}
          ON DUPLICATE KEY UPDATE
            event_ts = VALUES(event_ts),
            ingested_at = VALUES(ingested_at),
            lonlat = VALUES(lonlat)
        `
        );
        console.log(
          `[Demo Mode] Created locations for ${city.name}, affected rows:`,
          result
        );
      }

      console.log("[Demo Mode] Created locations for all cities");

      // Update subscribers table
      await Exec(
        config,
        `
        INSERT INTO subscribers (city_id, subscriber_id, current_location)
        SELECT city_id, subscriber_id, lonlat
        FROM locations
        WHERE subscriber_id >= 2000
        AND ingested_at = (SELECT MAX(ingested_at) FROM locations l2 WHERE l2.subscriber_id = locations.subscriber_id)
        ON DUPLICATE KEY UPDATE current_location = VALUES(current_location)
      `
      );

      console.log("[Demo Mode] Updated subscribers table");

      // Debug: Check what we created
      const offerCheck = await Query(
        config,
        'SELECT offer_id, customer FROM offers WHERE customer LIKE "Demo Campaign%"'
      );
      console.log("[Demo Mode] Created offers:", offerCheck);

      const subCheck = await Query(
        config,
        "SELECT city_id, COUNT(*) as count FROM subscribers WHERE subscriber_id >= 2000 GROUP BY city_id"
      );
      console.log("[Demo Mode] Subscribers by city:", subCheck);

      const notifCheck = await Query(
        config,
        "SELECT city_id, COUNT(*) as count FROM notifications WHERE ts > DATE_SUB(NOW(), INTERVAL 10 MINUTE) GROUP BY city_id"
      );
      console.log(
        "[Demo Mode] Notifications by city (last 10 min):",
        notifCheck
      );

      console.log(
        '[Demo Mode] Complete! Now click "Generate Notifications" on the Configure page.'
      );
    } catch (e) {
      console.error("[Demo Mode] Error:", e);
    } finally {
      setGeneratingDemo(false);
    }
  }, [config]);*/

  if (!connected) {
    window.location.href = "/";
  }

  let mapStatisticsContainer;
  if (!initialized) {
    mapStatisticsContainer = <SetupDatabaseButton />;
  } else if (!enabled) {
    mapStatisticsContainer = <EnableSimulatorWarning />;
  } else {
    mapStatisticsContainer = <StatsWrapper />;
  }

  return (
    <Flex
      gap={4}
      justifyContent="space-between"
      direction={["column", "column", "row"]}
      margin={0}
      padding={0}
      position="relative"
      height="100%"
    >
      <Box
        width="100%"
        flex="2 2 0"
        minHeight="200px"
        maxHeight="100%"
        position="relative"
      >
        <PixiMap
          selectionDropdownLeft={isSmallScreen ? undefined : "31.5%"}
          selectionDropdownTop={isSmallScreen ? undefined : "1vw"}
          useRenderer={useCombinedRenderer}
          options={{}}
        />
        {/* View Mode Toggle */}
        {initialized && enabled && (
          <HStack
            position="absolute"
            top="20px"
            right="20px"
            background={legendBg}
            padding="4px"
            borderRadius="8px"
            boxShadow="0 2px 8px rgba(0,0,0,0.15)"
            fontSize="sm"
            zIndex={1000}
            spacing={2}
          >
            <Button
              size="sm"
              onClick={() => setViewMode("notifications")}
              background={
                viewMode === "notifications" ? activeBg : "transparent"
              }
              color={viewMode === "notifications" ? "white" : "inherit"}
              _hover={{
                background: viewMode === "notifications" ? activeBg : toggleBg,
              }}
              borderRadius="6px"
            >
              Notifications
            </Button>
            <Button
              size="sm"
              onClick={() => setViewMode("status")}
              background={viewMode === "status" ? activeBg : "transparent"}
              color={viewMode === "status" ? "white" : "inherit"}
              _hover={{
                background: viewMode === "status" ? activeBg : toggleBg,
              }}
              borderRadius="6px"
            >
              Status
            </Button>
          </HStack>
        )}
        {/* Legend */}
        {initialized && enabled && (
          <Box
            position="absolute"
            bottom="20px"
            right="20px"
            background={legendBg}
            padding="12px 16px"
            borderRadius="8px"
            boxShadow="0 2px 8px rgba(0,0,0,0.15)"
            fontSize="sm"
            zIndex={1000}
          >
            {viewMode === "status" ? (
              <>
                <Text fontWeight="bold" marginBottom="8px">
                  Subscriber Status
                </Text>
                <Flex alignItems="center" gap={2} marginBottom="4px">
                  <Box
                    width="12px"
                    height="12px"
                    borderRadius="50%"
                    background="green.500"
                    border="1px solid"
                    borderColor={dotBorderColor}
                  />
                  <Text>Fresh & in campaign zone</Text>
                </Flex>
                <Flex alignItems="center" gap={2}>
                  <Box
                    width="12px"
                    height="12px"
                    borderRadius="50%"
                    background="red.500"
                    border="1px solid"
                    borderColor={dotBorderColor}
                  />
                  <Text>Stale or outside zone</Text>
                </Flex>
              </>
            ) : (
              <>
                <Text fontWeight="bold" marginBottom="8px">
                  Real-time Notifications
                </Text>
                <Flex alignItems="center" gap={2}>
                  <Box
                    width="12px"
                    height="12px"
                    borderRadius="50%"
                    background="purple.600"
                    border="1px solid"
                    borderColor={dotBorderColor}
                  />
                  <Text>Ad delivered</Text>
                </Flex>
              </>
            )}
          </Box>
        )}
      </Box>
      <Stack
        spacing={4}
        position={isSmallScreen ? "relative" : "absolute"}
        boxShadow="0px 3px 2px 0px #DDDDDE"
        background={useColorModeValue("white", "gray.800")}
        left={0}
        top={0}
        overflow={isSmallScreen ? undefined : "auto"}
        width={isSmallScreen ? "100%" : "31%"}
        height={isSmallScreen ? "auto" : "100%"}
        borderBottomRightRadius="10px"
        padding="36px 48px 36px 48px"
        zIndex={20}
        pointerEvents="auto"
      >
        {mapStatisticsContainer}
      </Stack>
    </Flex>
  );
};
