import { SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
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
import React from "react";
import { BsEye, BsInfoCircleFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";

import { EnableSimulatorButton } from "@/components/EnableSimulatorButton";
import { IngestChart, useIngestChartData } from "@/components/IngestChart";
import { MarkdownText } from "@/components/MarkdownText";
import { PixiMap } from "@/components/PixiMap";
import { ResetSchemaButton } from "@/components/ResetSchemaButton";
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

const StatsWrapper = () => {
  const config = useRecoilValue(connectionConfig);

  const ingestData = useIngestChartData(
    config,
    "locations",
    "requests",
    "purchases",
    "notifications",
    "subscriber_segments"
  );

  const [selectedCities] = useRecoilState(selectedCitiesFromRecoil);
  const [isUpdating] = useRecoilState(isUpdatingCities);
  const { onCreateCity, onRemoveCity } = useUpdateCityList(config);
  const [lastSelectedCityId, setLastSelectedCityId] =
    useRecoilState(selectedCity);
  const { colorMode } = useColorMode();
  const [totalSelectableCities, setTotalSelectableCities] =
    React.useState(selectedCities);

  const getCheckedFontColor = (city: City) => {
    if(selectedCities.map((c) => c.id).includes(city.id)) {
      if (colorMode === "light") {
        return "purple.500";
      } else {
        return "purple.200";
      }
    }
    return undefined;
  };

  const setCheckItem = (city: City, checkStatus: boolean) => {
    if (checkStatus) {
      onCreateCity(city.centerLat, city.centerLon);
      setLastSelectedCityId(city.id);
    } else {
      const noOfSelectedCities = selectedCities.length;
      if (noOfSelectedCities <= 1) {
        setLastSelectedCityId(-1);
      } else {
        setLastSelectedCityId(
          city.id !== selectedCities[0].id ? selectedCities[0].id : selectableCitiesData[1].id
        );
      }
      onRemoveCity(city.id);
    }
  };

  React.useEffect(() => {
    const selectableCityIds = selectableCitiesData.map((c) => c.id);
    const unknownSelectedCities = selectedCities.filter(
      (c) => !selectableCityIds.includes(c.id)
    );
    setTotalSelectableCities([
      ...selectableCitiesData,
      ...unknownSelectedCities,
    ]);
    if (lastSelectedCityId === -1 && selectedCities.length) {
      setLastSelectedCityId(selectedCities[0].id);
    }
  }, [selectedCities, lastSelectedCityId, setLastSelectedCityId]);

  return (
    <>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Heading fontSize="md">Locations</Heading>
          <Text overflowWrap="break-word">
            Select cities to add to the dataset
          </Text>
        </Stack>
        <Tooltip
          isDisabled={isUpdating ? false : true}
          label="Updating city list"
          hasArrow
          placement="top"
          zIndex={5}
        >
          <SimpleGrid minChildWidth="25%" spacing={[1, 3]}>
            {totalSelectableCities.map((city) => (
              <Checkbox
                size="md"
                disabled={isUpdating}
                key={city.id}
                zIndex={10}
                colorScheme="purple"
                isChecked={
                  selectedCities.map((c) => c.id).includes(city.id)
                    ? true
                    : false
                }
                onChange={(e) => setCheckItem(city, e.target.checked)}
              >
                <Flex
                  justifyContent="left"
                  alignItems="center"
                  gap={1}
                  color={getCheckedFontColor(city)}
                >
                  <Text>{city.name}</Text>
                  {lastSelectedCityId === city.id && selectedCities.length ? <BsEye size="1.2em" /> : undefined}
                </Flex>
              </Checkbox>
            ))}
          </SimpleGrid>
        </Tooltip>
        <br />
      </Stack>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Heading size="md">Key Metrics</Heading>
          <Text>Serving ads real-time to sumulate Subscribers</Text>
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

export const NotificationsMap = () => {
  const { connected, initialized } = useConnectionState();
  const enabled = useRecoilValue(simulatorEnabled);
  useSimulationMonitor(enabled && connected && initialized);
  useSimulator(enabled && connected && initialized);
  const [isSmallScreen] = useMediaQuery("(max-width: 640px)");
  const { colorMode } = useColorMode();

  const handleLinkRedirects = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    window.open(
      e.currentTarget.value,
      "_self"
    );
  };

  let inner;
  if (!connected) {
    inner = (
      <Box>
        <MarkdownText>
          {`

        This application is a demo of how to use SingleStore to serve ads to
        users based on their behavior and realtime location. The demo is
        based on location, purchase, and request history from millions of
        simulated subscribers for a hypothetical service company. To learn
        about how this works please visit the [overview page](overview).
      `}
        </MarkdownText>
        <Button
          size="sm"
          value="/"
          onClick={handleLinkRedirects}
          background={colorMode === "light" ? "#ECE8FD" : "#2F206E"}
          color={colorMode === "light" ? "#553ACF" : "#ECE8FD"}
        >
          <SettingsIcon />
          <Text pl={2}>Connect to SingleStore</Text>
        </Button>
      </Box>
    );
  } else if (!initialized) {
    inner = (
      <Box>
        <MarkdownText>
          {`
        Setup database from configuration page to use the application.
      `}
        </MarkdownText>
        <ResetSchemaButton
          background={colorMode === "light" ? "#ECE8FD" : "#2F206E"}
          color={colorMode === "light" ? "#553ACF" : "#ECE8FD"}
          size="sm"
        >
          Setup database
        </ResetSchemaButton>
      </Box>
    );
  } else if (!enabled) {
    inner = <EnableSimulatorButton />;
  } else {
    inner = <StatsWrapper />;
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
      <Stack spacing={0} width="100%" height="100%" minHeight="60%">
        <PixiMap
          selectionDropdownLeft={isSmallScreen ? undefined : "31.5%"}
          selectionDropdownTop={isSmallScreen ? undefined : "1vw"}
          useRenderer={useNotificationsRenderer}
          options={{}}
        />
      </Stack>
      <Stack
        spacing={4}
        position={isSmallScreen ? "relative" : "absolute"}
        boxShadow="0px 3px 2px 0px #ddddde"
        background={useColorModeValue("white", "gray.800")}
        left={0}
        top={0}
        overflow={isSmallScreen ? undefined : "auto"}
        width={isSmallScreen ? "100%" : "30%"}
        height={isSmallScreen ? "auto" : "100%"}
        borderBottomRightRadius="10px"
        padding="36px 48px 36px 48px"
      >
        {inner}
      </Stack>
    </Flex>
  );
};
