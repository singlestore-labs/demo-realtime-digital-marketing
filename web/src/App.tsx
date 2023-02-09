import { Box, Center, Flex } from "@chakra-ui/react";
import * as React from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

import { useAnalytics } from "@/analytics";
import { Footer } from "@/components/Footer";
import { Loader } from "@/components/loader/Loader";
import { Nav } from "@/components/navBar/Nav";
import { AnalyticsDashboard } from "@/pages/Analytics";
import { Overview } from "@/pages/Configure";
import { NotificationsMap } from "@/pages/Dashboard";
import { HomePage } from "@/pages/HomePage";
import { useConnectionState } from "@/view/hooks/hooks";

import { redirectToHomaPage } from "./data/recoil";

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

const PrivateRoute: React.FC<{children: React.ReactElement}> = ( {children }) => {
  const redirect = useRecoilValue(redirectToHomaPage);
  if (redirect) {
    return <Navigate to="/" />;
  }
  return children;
};

const LayoutContainer = ({children}: {children: React.ReactElement}) => {
  const redirect = useRecoilValue(redirectToHomaPage);
  if(redirect) {
    return children;
  }
  return <><Nav />{children}<Footer /></>;
};

const RoutesContainer = () => {
  const { connected } = useConnectionState();
  const [redirect, setRedirect] = useRecoilState(redirectToHomaPage);  // To ensure connection configuration when RTDM App is loaded for the first time.
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    // We will redirect to Home page '/' if user loaded the website for first time in browser and configuration is not set.
    // Once connection is successful to singlestore it will autoredirect to appropriate page.
    if (location.pathname !== "/" && !connected && redirect) {
      navigate({
        pathname: "/",
        search: `?redirect=${location.pathname}`,
      });
    }
    if (connected) {
      setRedirect(false);
    }
  }, [connected, location.pathname, navigate, redirect, setRedirect]);

  const Analytics = () => {
    useAnalytics();
    return <></>;
  };

  return (
    <>
      <Analytics />
      <Flex height="100vh" width="100vw" direction="column" overflowY="auto">
        <LayoutContainer>
        <Box flex="1" paddingTop="3px">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<PrivateRoute><NotificationsMap /></PrivateRoute>} />
            <Route path="/configure" element={<PrivateRoute><Overview /></PrivateRoute>} />
            <Route path="/analytics" element={<PrivateRoute><AnalyticsDashboard /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Box>
        </LayoutContainer>
      </Flex>
    </>
  );
};

export default App;
