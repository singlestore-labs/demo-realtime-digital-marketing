import {
  Box,
  Center,
  Flex,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
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
import { Loader } from "@/components/customcomponents/loader/Loader";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/navBar/Nav";
import { AnalyticsDashboard } from "@/pages/Analytics";
import { Overview } from "@/pages/Configure";
import { NotificationsMap } from "@/pages/Dashboard";
import { HomePage } from "@/pages/HomePage";
import { useConnectionState } from "@/view/hooks/hooks";

import { redirectToHomePage } from "./data/recoil";

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  // Private routes will ensure user is connected to singlestore before using the route.
  // Will redirect to connection page in case user in not connected.
  const redirect = useRecoilValue(redirectToHomePage);
  if (redirect) {
    return <Navigate to="/" />;
  }
  return children;
};

const LayoutContainer = ({ children }: { children: React.ReactElement }) => {
  const redirect = useRecoilValue(redirectToHomePage);
  if (redirect) {
    return children;
  }
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
};

const RoutesBlock = () => {
  const [redirect, setRedirect] = useRecoilState(redirectToHomePage); // To ensure connection configuration when RTDM App is loaded for the first time.
  const { connected } = useConnectionState();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { colorMode } = useColorMode();

  const ToastDescriptionComponent = () => {
    return (
      <Text style={{ lineHeight: "28px", fontWeight: 400, fontSize: "16px" }}>
        This is a demo application for an international marketing company
        serving simulated customer offers to millions of subscribers. You can:
        <ul style={{ listStylePosition: "inside", listStyleType: "initial" }}>
          <li>Add or remove locations from Dashboard</li>
          <li>Inspect engagement under Analytics</li>
          <li>Change schema settings with Configure</li>
        </ul>
      </Text>
    );
  };

  React.useEffect(() => {
    // We will redirect to Home page '/' if user loaded the website for first time in browser and configuration is not set.
    // Once connection is successful to singlestore it will autoredirect to appropriate page that user was trying to open.
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

  React.useEffect(() => {
    // Welcome message toast on successfully connecting to singlestore for the first time.
    if (!redirect) {
      toast({
        title: "Hello there!",
        description: <ToastDescriptionComponent />,
        status: "info",
        duration: 9000,
        isClosable: true,
        containerStyle: {
          borderRadius: "6px",
          background: colorMode === "light" ? "#553ACF" : "#CCC3F9",
          position: "absolute",
          bottom: "15%",
          zIndex: 10,
        },
      });
    }
  }, [redirect, toast, colorMode]);

  return (
    <Box flex="1" paddingTop="3px">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <NotificationsMap />
            </PrivateRoute>
          }
        />
        <Route
          path="/configure"
          element={
            <PrivateRoute>
              <Overview />
            </PrivateRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <PrivateRoute>
              <AnalyticsDashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Box>
  );
};

const App = () => {
  const loadingFallback = (
    <Center height="100vh">
      <Loader size="large" centered />
    </Center>
  );

  const Analytics = ({ children }: { children: React.ReactNode }) => {
    useAnalytics();
    return <>{children}</>;
  };

  return (
    <React.Suspense fallback={loadingFallback}>
      <Analytics>
        <Flex height="100vh" width="100vw" direction="column" overflowY="auto">
          <LayoutContainer>
            <RoutesBlock />
          </LayoutContainer>
        </Flex>
      </Analytics>
    </React.Suspense>
  );
};

export default App;
