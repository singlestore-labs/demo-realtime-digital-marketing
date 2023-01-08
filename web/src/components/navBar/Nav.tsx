import { useConnectionState } from "@/data/hooks";
import { databaseDrawerIsOpen, simulatorEnabled } from "@/data/recoil";
import { useSession } from "@/data/useSession";
import SinglestoreLogo from "@/assets/singlestore-logo-filled-sm.png";
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import {
  BsMap,
  BsGraphUp,
  BsGear,
  BsShare,
  BsShareFill,
  BsMapFill,
  BsGearFill,
} from "react-icons/bs";
import { NavLink as RouterLink } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { GithubStargazer } from "../GithubButtons";
import { ReactElement } from "react-markdown/lib/react-markdown";

// const NavLink = ({
//   to,
//   children,
//   onClick,
// }: {
//   to: string;
//   children: ReactNode;
//   onClick: () => void;
// }) => {
//   const resolved = useResolvedPath(to);
//   const match = useMatch({ path: resolved.pathname, end: true });

//   return (
//     <Link
//       as={RouterLink}
//       to={to}
//       px={2}
//       py={1}
//       onClick={onClick}
//       rounded={"md"}
//       _hover={{
//         textDecoration: "none",
//         bg: useColorModeValue("gray.300", "gray.600"),
//       }}
//       fontWeight={match ? "bold" : "normal"}
//       href={"#"}
//       color={useColorModeValue("gray.700", "gray.200")}
//     >
//       {children}
//     </Link>
//   );
// };

export const Nav = () => {
  const { toggleColorMode } = useColorMode();
  const { colorMode } = useColorMode();
  const navMenu = useDisclosure();
  const [databaseMenuIsOpen, setDatabaseMenu] =
    useRecoilState(databaseDrawerIsOpen);
  const databaseBtnRef = React.useRef<HTMLButtonElement>(null);
  const { connected, initialized } = useConnectionState();
  const isSimulatorEnabled = useRecoilValue(simulatorEnabled);
  const [isSmallScreen] = useMediaQuery("(max-width: 640px)");
  const { session } = useSession();

  const NavLinkActiveButtonStyle = {
    background: useColorModeValue("#4F34C7", "#CCC3F9"),
    color: useColorModeValue("#FFFFFF", "#2F206E"),
  };

  const LinksIntenralComponent = (props: {
    NavLinkTitle: string;
    IconElement: ReactElement;
  }) => {
    return (
      <Flex gap={3} alignItems={"center"}>
        <b>{props.NavLinkTitle} </b>
        {props.IconElement}
      </Flex>
    );
  };

  const NavLinkComponent = (props: {
    NavLinkTitle: string;
    IconElement: ReactElement;
    to: string;
  }) => {
    return (
      <Link
        padding={"4px 15px 4px 15px"}
        borderRadius="5px"
        as={RouterLink}
        color={useColorModeValue("#553ACF", "#CCC3F9")}
        to={props.to}
        onClick={navMenu.onClose}
        _hover={NavLinkActiveButtonStyle}
        _activeLink={NavLinkActiveButtonStyle}
      >
        <LinksIntenralComponent
          NavLinkTitle={props.NavLinkTitle}
          IconElement={props.IconElement}
        />
      </Link>
    );
  };

  const links = (
    <>
      <NavLinkComponent
        to={"/"}
        NavLinkTitle={"Dashboard"}
        IconElement={<Icon as={colorMode === "light" ? BsMap : BsMapFill} />}
      />
      <NavLinkComponent
        to={"/configure"}
        NavLinkTitle={"Configure"}
        IconElement={<Icon as={colorMode === "light" ? BsGear : BsGearFill} />}
      />
      <NavLinkComponent
        to={"/analytics"}
        NavLinkTitle={"Analytics"}
        IconElement={<Icon as={BsGraphUp} />}
      />
    </>
  );

  let databaseMenuButtonText;
  if (!isSmallScreen) {
    databaseMenuButtonText = connected
      ? initialized
        ? isSimulatorEnabled && session.isController
          ? "connected"
          : "simulator disabled"
        : "needs schema"
      : "disconnected";
  }

  return (
    <>
      <Box
        bg={useColorModeValue("#ECE8FD", "#2F206E")}
        borderBottomRadius={"10px"}
        borderTop={0}
        justifyContent={"center"}
        alignItems={"center"}
        alignContent={"center"}
        boxShadow={colorMode === "light" ? "0 2px 2px #ddddde" : undefined}
        zIndex={5}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        <Container maxW="inherit" padding="0 12.5% 0 12.5%">
          <Flex h={16} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={navMenu.isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={navMenu.isOpen ? navMenu.onClose : navMenu.onOpen}
            />

            <HStack
              as={"nav"}
              spacing={2}
              display={{ base: "none", md: "flex" }}
            >
              <Wrap display={"inline-block"}>
                <WrapItem>
                  <Avatar
                    size={"sm"}
                    name="Dan Abrahmov"
                    src={SinglestoreLogo}
                  />
                </WrapItem>
              </Wrap>
              <Heading as="h1" size={isSmallScreen ? "sm" : "md"}>
                {isSmallScreen ? "Martech" : "Realtime Digital Marketing"}
              </Heading>
            </HStack>
            <HStack
              as={"nav"}
              spacing={4}
              alignItems={"center"}
              justifyContent={"right"}
              display={{ base: "none", md: "flex" }}
            >
              {links}
            </HStack>

            <Flex alignItems={"center"} justifyContent={"right"} gap={7}>
              <Icon
                aria-label="Github Repo"
                as={colorMode === "light" ? BsShare : BsShareFill}
                cursor={"pointer"}
                onClick={() =>
                  window.open(
                    "https://github.com/singlestore-labs/demo-realtime-digital-marketing"
                  )
                }
              />
              {colorMode === "light" ? (
                <SunIcon onClick={toggleColorMode} />
              ) : (
                <MoonIcon onClick={toggleColorMode} />
              )}
              <GithubStargazer
                color="black"
                owner={"singlestore-labs"}
                repo={"demo-realtime-digital-marketing"}
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
        </Container>
      </Box>
    </>
  );
};
