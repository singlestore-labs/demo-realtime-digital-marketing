import { useAnalytics } from "@/analytics";
import { AnalyticsDashboard } from "@/pages/analytics/AnalyticsDashboard";
import { Nav } from "@/components/navBar/Nav";
import { NotificationsMap } from "@/pages/dashboards/index";
import { Overview } from "./pages/configure/Overview";
import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

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

  const Analytics = () => {
    useAnalytics();
    return <></>;
  };

  return (
    <Suspense fallback={loadingFallback}>
      <Analytics />
      <Flex
        height="100vh"
        width="100vw"
        direction="column"
        overflowY={"hidden"}
      >
        <Nav />
        <Box flex="1" paddingTop={"6px"}>
          <Routes>
            <Route path="/" element={<NotificationsMap />} />
            <Route path="/configure" element={<Overview />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Flex>
    </Suspense>
  );
}

export default App;
