import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import DashboardControllerImage from "@/assets/dashboard-controller-snapshot.svg";
import GraphicalBackground2 from "@/assets/graphical-background-2.svg";
import SingleStoreLogoDrak from "@/assets/singlestore-logo-dark.svg";
import SinglestoreLogo from "@/assets/singlestore-logo-filled-sm.svg";
import { DatabaseConfigFormManual } from "@/components/dataConfigForm/DatabaseConfigFormManual";
import { useUpdateCityList } from "@/data/models/useUpdateCityList";
import { useConnectionState } from "@/view/hooks/hooks";

export const HomePage: React.FC = () => {
  const { connected } = useConnectionState();
  const navigate = useNavigate();
  const fontColor = useColorModeValue("#553ACF", "#CCC3F9");
  const [isSmallScreen] = useMediaQuery("(max-width: 640px)");
  const { updateCityList } = useUpdateCityList();

  React.useEffect(() => {
    if (connected) {
      updateCityList();
      navigate("/dashboard");
    }
  }, [connected, navigate, updateCityList]);

  return (
    <Grid
      templateColumns={isSmallScreen ? "repeat(1, 1fr)" : "repeat(2, 1fr)"}
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <GridItem padding="10% 10% 10% 20%">
        <Stack spacing={4}>
          <Heading>
            <Image
              src={useColorModeValue(SinglestoreLogo, SingleStoreLogoDrak)}
            />
          </Heading>
          <Heading>
            <Text>Real-time Digital Marketing</Text>
          </Heading>
          <Text size="1.2em">
            Watch{" "}
            <Link
              fontWeight="bold"
              href="https://portal.singlestore.com"
              isExternal
            >
              SingleStoreDB
            </Link>{" "}
            serve ads to millions of simulated subscribers based on their
            behavior, purchases, request history, and geolocation.
          </Text>
          <Tabs variant="unstyled">
            <TabList>
              <Tab
                justifyContent="center"
                _selected={{
                  color: fontColor,
                  borderBottom: `2px solid ${useColorModeValue(
                    "#553ACF",
                    "#CCC3F9"
                  )}`,
                }}
                fontWeight="bold"
                gap={1}
              >
                Connect to Singlestore
              </Tab>
            </TabList>
            <TabPanels padding={0} margin={0}>
              <TabPanel paddingLeft={0} paddingTop={5} margin={0}>
                <DatabaseConfigFormManual showDatabase />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </GridItem>
      <GridItem
        backgroundImage={GraphicalBackground2}
        justifyContent="center"
        alignItems="center"
        backgroundSize="170%"
        height="100%"
        width="100%"
        minWidth="300px"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <Flex
          direction="row-reverse"
          height="100%"
          width="100%"
          alignItems="center"
        >
          <Image width="80%" objectFit="cover" src={DashboardControllerImage} />
        </Flex>
      </GridItem>
    </Grid>
  );
};
