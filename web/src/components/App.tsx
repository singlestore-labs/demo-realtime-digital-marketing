import { Dashboard } from "@/components/Dashboard";
import { Nav } from "@/components/Nav";
import { Box, Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Flex height="100vh" direction="column">
      <Nav />
      <Box m={4} flex="1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Box>
    </Flex>
  );
}

export default App;
