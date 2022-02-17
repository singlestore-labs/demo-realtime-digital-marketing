import { Nav } from "@/components/Nav";
import { NotificationsMap } from "@/components/NotificationsMap";
import { Overview } from "@/components/Overview";
import { useSimulator } from "@/data/useSimulator";
import { Box, Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

function App() {
  useSimulator();

  return (
    <Flex height="100vh" direction="column">
      <Nav />
      <Box m={4} flex="1">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/map" element={<NotificationsMap />} />
        </Routes>
      </Box>
    </Flex>
  );
}

export default App;
