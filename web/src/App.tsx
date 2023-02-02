import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { useAnalytics } from "@/analytics";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/navBar/Nav";
import { AnalyticsDashboard } from "@/pages/Analytics";
import { Overview } from "@/pages/Configure";
import { NotificationsMap } from "@/pages/Dashboard";

import { useUpdateCityList } from "./data/models/useUpdateCityList";
import { connectionConfig } from "./data/recoil";
import { HomePage } from "./pages/HomePage";
import { useConnectionState } from "./view/hooks/hooks";

function App() {
  const loadingFallback = (
    <Center height="100vh">
      <Spinner
        size="xl"
        speed="0.85s"
        thickness="3px"
        emptyColor="gray.200"
        colorScheme="purple"
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
  const {connected} = useConnectionState();
  const { updateCityList } = useUpdateCityList(config);
  const [redirectToHomePage, setRedirectToHomaePage] = useState(true); // This allow user to modify connection settings in configuration page without redirecting to Home page
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    // We will redirect to Home page '/' if user loaded the website for first time in browser and configuration is not set.
    // Once connection is successful to singlestore it will autoredirect to appropriate page.
    if (location.pathname !== "/" && !connected && redirectToHomePage) {
        navigate({
          pathname: "/",
          search: `?redirect=${location.pathname}`
        });
    }
    if (connected) {
      setRedirectToHomaePage(false);
    }
  }, [connected, location.pathname, navigate, redirectToHomePage]);

  const Analytics = () => {
    useAnalytics();
    return <></>;
  };
  
  return (
    <>
      <Analytics />
      <Flex height="100vh" width="100vw" direction="column" overflowY="auto">
        { !redirectToHomePage && <Nav /> }
        <Box flex="1" paddingTop="3px">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage updateCityList={updateCityList} redirectToHomePage={redirectToHomePage} setRedirectToHomaePage={setRedirectToHomaePage} />
              }
            />
            <Route
              path="/dashboard"
              element={
                  <NotificationsMap />
              }
            />
            <Route path="/configure" element={<Overview />} />
            <Route
              path="/analytics"
              element={
                  <AnalyticsDashboard />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
        { !redirectToHomePage && <Footer /> }
      </Flex>
    </>
  );
};

export default App;
