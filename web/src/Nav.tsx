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
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  Link,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import {
  NavLink as RouterLink,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import { DatabaseDrawer } from "./DatabaseDrawer";

const NavLink = ({ to, children }: { to: string; children: ReactNode }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      as={RouterLink}
      to={to}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      fontWeight={match ? "bold" : "normal"}
      href={"#"}
    >
      {children}
    </Link>
  );
};

export const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navMenu = useDisclosure();
  const databaseMenu = useDisclosure();
  const databaseBtnRef = React.useRef<HTMLButtonElement>(null);

  // TODO: Retrieve database connection status
  const connected = true;

  const links = (
    <>
      <NavLink to="/">Dashboard</NavLink>
    </>
  );

  return (
    <>
      <Box bg={useColorModeValue("gray.200", "gray.700")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={navMenu.isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={navMenu.isOpen ? navMenu.onClose : navMenu.onOpen}
          />

          <HStack spacing={8} alignItems={"center"}>
            <Heading size="lg">S2 Cellular</Heading>
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
              onClick={databaseMenu.onOpen}
              leftIcon={connected ? <CheckCircleIcon /> : <WarningTwoIcon />}
              colorScheme={connected ? "green" : "red"}
            >
              {connected ? "connected" : "disconnected"}
            </Button>
            <Button size="sm" onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
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
          isOpen={databaseMenu.isOpen}
          onClose={databaseMenu.onClose}
          finalFocusRef={databaseBtnRef}
        />
      </Box>
    </>
  );
};
