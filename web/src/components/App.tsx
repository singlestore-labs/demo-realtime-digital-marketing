import { useAnalytics } from "@/analytics";
import { Admin } from "@/components/Admin";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { Nav } from "@/components/Nav";
import { NotificationsMap } from "@/components/NotificationsMap";
import { Overview } from "@/components/Overview";
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
      <Flex height="100vh" direction="column">
        <Nav />
        <Box m={4} flex="1">
          <Routes>
            <Route path="/" element={<NotificationsMap />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Flex>
    </Suspense>
  );
}

export default App;
