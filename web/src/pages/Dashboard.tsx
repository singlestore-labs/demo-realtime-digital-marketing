import {
  Box,
  Checkbox,
  Flex,
  Heading,
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

import { EnableSimulatorButton } from "@/components/EnableSimulatorButton";
import { IngestChart, useIngestChartData } from "@/components/IngestChart";
import { PixiMap } from "@/components/PixiMap";
import { SetupDatabaseButton } from "@/components/SetupDatabaseButton";
import { Stats } from "@/components/Stats";
import { selectableCitiesData } from "@/data/constants";
import { useUpdateCityList } from "@/data/models/useUpdateCityList";
import { City } from "@/data/queries";
import {
  connectionConfig,
  isUpdatingCities,
  selectedCities as selectedCitiesFromRecoil,
  selectedCity,
  simulatorEnabled,
} from "@/data/recoil";
import { useNotificationsRenderer } from "@/render/useNotificationsRenderer";
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
            <Heading size="md">Key Metrics</Heading>
            <Text>Serving ads real-time to simulate subscribers</Text>
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
            color={useColorModeValue("#553ACF", "#ECE8FD")}
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
    if (cityIndex === 0) {
      if (selectedCities.length > 1) {
        return selectableCitiesData[1].id;
      }
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
    const selectableCityIds = selectableCitiesData.map((c) => c.id);
    const unknownSelectedCities = selectedCities.filter(
      (c) => !selectableCityIds.includes(c.id)
    );
    setTotalSelectableCities([
      ...selectableCitiesData,
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
            <Heading fontSize="md">Locations</Heading>
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

export const NotificationsMap = () => {
  const { connected, initialized } = useConnectionState();
  const enabled = useRecoilValue(simulatorEnabled);
  useSimulationMonitor(enabled && connected && initialized);
  useSimulator(enabled && connected && initialized);
  const [isSmallScreen] = useMediaQuery("(max-width: 640px)");

  if (!connected) {
    window.location.href = "/";
  }

  let mapStatisticsContainer;
  if (!initialized) {
    mapStatisticsContainer = <SetupDatabaseButton />;
  } else if (!enabled) {
    mapStatisticsContainer = <EnableSimulatorButton />;
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
      <Box width="100%" flex="2 2 0" minHeight="200px" maxHeight="100%">
        <PixiMap
          selectionDropdownLeft={isSmallScreen ? undefined : "31.5%"}
          selectionDropdownTop={isSmallScreen ? undefined : "1vw"}
          useRenderer={useNotificationsRenderer}
          zoom={13}
          options={{}}
        />
      </Box>
      <Stack
        spacing={4}
        position={isSmallScreen ? "relative" : "absolute"}
        boxShadow="0px 3px 2px 0px #DDDDDE"
        background={useColorModeValue("white", "gray.800")}
        left={0}
        top={0}
        overflow={isSmallScreen ? undefined : "auto"}
        width={isSmallScreen ? "100%" : "30%"}
        height={isSmallScreen ? "auto" : "100%"}
        borderBottomRightRadius="10px"
        padding="36px 48px 36px 48px"
      >
        {mapStatisticsContainer}
      </Stack>
    </Flex>
  );
};
