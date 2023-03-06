import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";

import { useAnalytics } from "@/analytics";
import { Loader } from "@/components/customcomponents/loader/Loader";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/navBar/Nav";
import { AnalyticsDashboard } from "@/pages/Analytics";
import { Configure } from "@/pages/Configure";
import { NotificationsMap } from "@/pages/Dashboard";
import { HomePage } from "@/pages/HomePage";
import { useConnectionState } from "@/view/hooks/hooks";

import { showWelcomeMessage } from "./data/recoil";

const WelcomeMessageToast = () => {
  const [welcomeMessage, setwelcomeMessage] =
    useRecoilState(showWelcomeMessage);
  const toast = useToast();
  const { connected } = useConnectionState();
  const defaultFontTheme = useColorModeValue("white", "black");

  const ToastDescriptionComponent = () => {
    return (
      <Text style={{ fontWeight: 400, fontSize: "16px" }}>
        <Heading size="sm">Hello there!</Heading>
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

  const ToastBlock = () => (
    <Flex
      direction="row"
      justifyContent="center"
      position="relative"
      alignItems="center"
      gap="12px"
      padding="18px"
      color={defaultFontTheme}
      borderRadius="10px"
      background={useColorModeValue("#553ACF", "#CCC3F9")}
    >
      <CloseIcon
        fontSize="xx-small"
        position="absolute"
        top="23px"
        right="23px"
        cursor="pointer"
        onClick={() => toast.close("welcomeToast")}
      />
      <CheckCircleIcon color={defaultFontTheme} margin="15px" fontSize="lg" />
      <ToastDescriptionComponent />
    </Flex>
  );

  // Welcome message toast on successfully connecting to singlestore for the first time.
  if (connected && welcomeMessage) {
    toast({
      id: "welcomeToast",
      duration: 9000,
      isClosable: true,
      position: "bottom",
      render: () => <ToastBlock />,
    });
  }
  setwelcomeMessage(false);

  return <></>;
};

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  // Private routes will ensure user is connected to singlestore before using the route.
  // Will redirect to connection page in case user in not connected.
  const { connected } = useConnectionState();

  if (!connected) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <LayoutContainer>
        <WelcomeMessageToast />
        {children}
      </LayoutContainer>
    </>
  );
};

const Analytics = ({ children }: { children: React.ReactNode }) => {
  useAnalytics();
  return <>{children}</>;
};

const LayoutContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Nav />
      <Box flex="1" paddingTop="3px">
        {children}
      </Box>
      <Footer />
    </>
  );
};

const RoutesBlock = () => {
  return (
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
          <LayoutContainer>
            <Configure />
          </LayoutContainer>
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
  );
};

const App = () => {
  const loadingFallback = (
    <Center height="100vh">
      <Loader size="large" centered />
    </Center>
  );

  return (
    <React.Suspense fallback={loadingFallback}>
      <Analytics>
        <Flex height="100vh" width="100vw" direction="column" overflowY="auto">
          <RoutesBlock />
        </Flex>
      </Analytics>
    </React.Suspense>
  );
};

export default App;
