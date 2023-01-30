import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { useAnalytics } from "@/analytics";
import { Nav } from "@/components/navBar/Nav";
import { AnalyticsDashboard } from "@/pages/analytics/AnalyticsDashboard";
import { NotificationsMap } from "@/pages/dashboards/index";

import { Footer } from "./components/Footer";
import {
  CityListHookReturnType,
  useUpdateCityList,
} from "./data/models/useUpdateCityList";
import { connectionConfig } from "./data/recoil";
import { Overview } from "./pages/configure/Overview";

export let UserContext: React.Context<CityListHookReturnType>;

function App() {
  const loadingFallback = (
    <Center height="100vh">
      <Spinner
        size="xl"
        speed="0.85s"
        thickness="3px"
        emptyColor="gray.200"
        color="blue.500"
      />
    </Center>
  );

  return (
    <React.Suspense fallback={loadingFallback}>
      <RoutesContainer />
    </React.Suspense>
  );
}

const RoutesContainer = () => {
  const config = useRecoilValue(connectionConfig);
  const CityListHook = useUpdateCityList(config);
  UserContext = React.createContext(CityListHook);

  const Analytics = () => {
    useAnalytics();
    return <></>;
  };
  return (
    <>
      <Analytics />
      <Flex height="100vh" width="100vw" direction="column" overflowY="auto">
        <Nav />
        <Box flex="1" paddingTop="6px">
          <Routes>
            <Route
              path="/"
              element={
                <UserContext.Provider value={CityListHook}>
                  <NotificationsMap />
                </UserContext.Provider>
              }
            />
            <Route path="/configure" element={<Overview />} />
            <Route
              path="/analytics"
              element={
                <UserContext.Provider value={CityListHook}>
                  <AnalyticsDashboard />
                </UserContext.Provider>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
        <Footer />
      </Flex>
    </>
  );
};

export default App;
