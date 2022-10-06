import { Admin } from "@/components/Admin";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { Nav } from "@/components/Nav";
import { NotificationsMap } from "@/components/NotificationsMap";
import { Overview } from "@/components/Overview";
import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import { Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { WelcomeModal } from "@/components/WelcomeModal";
import { usePortalConnection } from "@/use-portal-connection";

function App() {
  const { connect } = usePortalConnection();

  useEffect(() => {
    connect()
  }, [connect])

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
    <Suspense fallback={loadingFallback}>
      <Flex height="100vh" direction="column">
        <Nav />
        <WelcomeModal />
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
