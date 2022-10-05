import { Admin } from "@/components/Admin";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { Nav } from "@/components/Nav";
import { NotificationsMap } from "@/components/NotificationsMap";
import { Overview } from "@/components/Overview";
import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import { Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { WelcomeModal } from "@/components/WelcomeModal";
import {
  connectionDatabase,
  connectionHost,
  connectionPassword,
  connectionUser,
} from "@/data/recoil";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";

function App() {
  const [_host, setHost] = useRecoilState(connectionHost);
  const [_user, setUser] = useRecoilState(connectionUser);
  const [_password, setPassword] = useRecoilState(connectionPassword);
  const [_database, setDatabase] = useRecoilState(connectionDatabase);
  const { pathname, search } = useLocation();
  console.log("......!.", {_user, _password})

  function connect() {
    // get hostname from URL
    // username by default
    // password?
    if (search) {
      const queryParams = new URLSearchParams(search);
      const hostname = queryParams.get("hostname");
      const credentials = queryParams.get("credentials");
      console.log({ hostname, credentials })
      if (hostname) {
        setHost(`https://${hostname}`)
      }
      if (credentials) {
        const decodedCredentials = atob(credentials);
        const { username, password } = JSON.parse(decodedCredentials)
        setUser(username);
        setPassword("")

      }
      setDatabase("martech")
    }
  }

  useEffect(() => {
    console.log("...s...!.")

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
