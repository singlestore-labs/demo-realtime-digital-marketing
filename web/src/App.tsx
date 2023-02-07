import { Box, Center, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAnalytics } from "@/analytics";
import { Footer } from "@/components/Footer";
import { Loader } from "@/components/loader/Loader";
import { Nav } from "@/components/navBar/Nav";
import { AnalyticsDashboard } from "@/pages/Analytics";
import { Overview } from "@/pages/Configure";
import { NotificationsMap } from "@/pages/Dashboard";
import { HomePage } from "@/pages/HomePage";
import { useConnectionState } from "@/view/hooks/hooks";

function App() {
  const loadingFallback = (
    <Center height="100vh">
      <Loader size="large" centered={true} />
    </Center>
  );

  return (
    <React.Suspense fallback={loadingFallback}>
      <RoutesContainer />
    </React.Suspense>
  );
}

const RoutesContainer = () => {
  const { connected } = useConnectionState();
  
  const [redirectToHomePage, setRedirectToHomaePage] = useState(true);  // To ensure connection configuration when RTDM App is loaded for the first time.
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    // We will redirect to Home page '/' if user loaded the website for first time in browser and configuration is not set.
    // Once connection is successful to singlestore it will autoredirect to appropriate page.
    if (location.pathname !== "/" && !connected && redirectToHomePage) {
      navigate({
        pathname: "/",
        search: `?redirect=${location.pathname}`,
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
        {!redirectToHomePage && <Nav />}
        <Box flex="1" paddingTop="3px">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  redirectToHomePage={redirectToHomePage}
                  setRedirectToHomaePage={setRedirectToHomaePage}
                />
              }
            />
            <Route path="/dashboard" element={<NotificationsMap />} />
            <Route path="/configure" element={<Overview />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
        {!redirectToHomePage && <Footer />}
      </Flex>
    </>
  );
};

export default App;
