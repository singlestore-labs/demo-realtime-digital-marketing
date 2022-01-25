import { Dashboard } from "@/components/Dashboard";
import { Nav } from "@/components/Nav";
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Box>
      <Nav />
      <Box m={4}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
