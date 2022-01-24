import { Route, Routes } from "react-router-dom";
import { Nav } from "./Nav";
import { Dashboard } from "./Dashboard";
import { Box } from "@chakra-ui/react";

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
