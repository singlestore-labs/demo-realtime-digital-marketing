import { DatabaseDrawer } from "@/components/DatabaseDrawer";
import { useConnectionState } from "@/data/hooks";
import { databaseDrawerIsOpen, simulatorEnabled } from "@/data/recoil";
import {
  CheckCircleIcon,
  CloseIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { VscGithub, VscGithubInverted } from "react-icons/vsc";
import {
  NavLink as RouterLink,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

const NavLink = ({
  to,
  children,
  onClick,
}: {
  to: string;
  children: ReactNode;
  onClick: () => void;
}) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      as={RouterLink}
      to={to}
      px={2}
      py={1}
      onClick={onClick}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.300", "gray.600"),
      }}
      fontWeight={match ? "bold" : "normal"}
      href={"#"}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      {children}
    </Link>
  );
};

export const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navMenu = useDisclosure();
  const [databaseMenuIsOpen, setDatabaseMenu] =
    useRecoilState(databaseDrawerIsOpen);
  const databaseBtnRef = React.useRef<HTMLButtonElement>(null);
  const { connected, initialized } = useConnectionState();
  const isSimulatorEnabled = useRecoilValue(simulatorEnabled);
  const [isSmallScreen] = useMediaQuery("(max-width: 640px)");

  const links = (
    <>
      <NavLink to="/" onClick={navMenu.onClose}>
        Overview
      </NavLink>
      <NavLink to="/map" onClick={navMenu.onClose}>
        Map
      </NavLink>
      <NavLink to="/admin" onClick={navMenu.onClose}>
        Admin
      </NavLink>
      <NavLink to="/analytics" onClick={navMenu.onClose}>
        Analytics
      </NavLink>
    </>
  );

  let databaseMenuButtonText;
  if (!isSmallScreen) {
    databaseMenuButtonText = connected
      ? initialized
        ? isSimulatorEnabled
          ? "connected"
          : "simulator disabled"
        : "needs schema"
      : "disconnected";
  }

  return (
    <>
      <Box bg={useColorModeValue("gray.200", "gray.700")}>
        <Container maxW="container.lg">
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={navMenu.isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={navMenu.isOpen ? navMenu.onClose : navMenu.onOpen}
            />

            <HStack spacing={8} alignItems={"center"}>
              <Heading as="h1" size={isSmallScreen ? "sm" : "md"}>
                {isSmallScreen ? "Martech" : "Realtime Digital Marketing"}
              </Heading>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {links}
              </HStack>
            </HStack>

            <Flex alignItems={"center"} gap={2}>
              <Button
                size="sm"
                ref={databaseBtnRef}
                onClick={() => setDatabaseMenu(true)}
                colorScheme={
                  connected
                    ? initialized && isSimulatorEnabled
                      ? "green"
                      : "yellow"
                    : "red"
                }
              >
                {initialized ? <CheckCircleIcon /> : <WarningTwoIcon />}
                {isSmallScreen || <Text pl={2}>{databaseMenuButtonText}</Text>}
              </Button>
              <IconButton
                aria-label="Github Repo"
                size="sm"
                icon={
                  colorMode === "light" ? (
                    <VscGithub size="1.4em" />
                  ) : (
                    <VscGithubInverted size="1.4em" />
                  )
                }
                onClick={() =>
                  window.open(
                    "https://github.com/singlestore-labs/demo-realtime-digital-marketing",
                    "_blank"
                  )
                }
              />
              <IconButton
                aria-label="Toggle Color Mode"
                size="sm"
                onClick={toggleColorMode}
                icon={
                  colorMode === "light" ? (
                    <MoonIcon boxSize="1.2em" />
                  ) : (
                    <SunIcon boxSize="1.2em" />
                  )
                }
              />
            </Flex>
          </Flex>

          {navMenu.isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {links}
              </Stack>
            </Box>
          ) : null}

          <DatabaseDrawer
            isOpen={databaseMenuIsOpen}
            onClose={() => setDatabaseMenu(false)}
            finalFocusRef={databaseBtnRef}
          />
        </Container>
      </Box>
    </>
  );
};
