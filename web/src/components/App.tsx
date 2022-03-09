import { Admin } from "@/components/Admin";
import { Nav } from "@/components/Nav";
import { NotificationsMap } from "@/components/NotificationsMap";
import { Overview } from "@/components/Overview";
import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

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
    <Suspense fallback={loadingFallback}>
      <Flex height="100vh" direction="column">
        <Nav />
        <Box m={4} flex="1">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/map" element={<NotificationsMap />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Box>
      </Flex>
    </Suspense>
  );
}

export default App;
