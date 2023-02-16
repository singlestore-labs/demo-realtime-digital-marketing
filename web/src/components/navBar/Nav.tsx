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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  BsBarChart,
  BsFillBarChartFill,
  BsGear,
  BsGearFill,
  BsMap,
  BsMapFill,
  BsShare,
  BsShareFill,
} from "react-icons/bs";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { NavLink as RouterLink } from "react-router-dom";

import SingleStoreLogoDrak from "@/assets/singlestore-logo-dark.svg";
import SinglestoreLogo from "@/assets/singlestore-logo-filled-sm.svg";
import { GithubStargazer } from "@/components/GithubButtons";
import { LinkedinIcon, TwitterIcon } from "@/components/IconLinks";

export const Nav = () => {
  const { toggleColorMode } = useColorMode();
  const { colorMode } = useColorMode();
  const navMenu = useDisclosure();
  const [isSmallScreen] = useMediaQuery("(max-width: 640px)");

  let themeModeIcon = <MoonIcon cursor="pointer" onClick={toggleColorMode} />;
  let logo = SinglestoreLogo;
  if (colorMode === "dark") {
    themeModeIcon = <SunIcon cursor="pointer" onClick={toggleColorMode} />;
    logo = SingleStoreLogoDrak;
  }

  let NavButtonIcon = <CloseIcon />;
  let navClickAction = navMenu.onOpen;
  if (navMenu.isOpen) {
    NavButtonIcon = <HamburgerIcon />;
    navClickAction = navMenu.onClose;
  }

  const NavLinkActiveButtonStyle = {
    background: useColorModeValue("#4F34C7", "#CCC3F9"),
    color: useColorModeValue("#FFFFFF", "#2F206E"),
  };

  const LinksIntenralComponent = ({
    NavLinkTitle,
    IconElement,
  }: {
    NavLinkTitle: string;
    IconElement: ReactElement;
  }) => {
    return (
      <Flex gap={2} alignItems="center">
        <b>{NavLinkTitle} </b>
        <Stack fontSize="0.8em" alignItems="center">
          {IconElement}
        </Stack>
      </Flex>
    );
  };

  const NavLinkComponent = ({
    NavLinkTitle,
    IconElement,
    to,
  }: {
    NavLinkTitle: string;
    IconElement: ReactElement;
    to: string;
  }) => {
    return (
      <Link
        padding="4px 15px 4px 15px"
        borderRadius="5px"
        as={RouterLink}
        color={useColorModeValue("#553ACF", "#CCC3F9")}
        to={to}
        onClick={navMenu.onClose}
        _hover={NavLinkActiveButtonStyle}
        _activeLink={NavLinkActiveButtonStyle}
      >
        <LinksIntenralComponent
          NavLinkTitle={NavLinkTitle}
          IconElement={IconElement}
        />
      </Link>
    );
  };

  const links = (
    <>
      <NavLinkComponent
        to="/dashboard"
        NavLinkTitle="Dashboard"
        IconElement={<Icon as={colorMode === "light" ? BsMap : BsMapFill} />}
      />
      <NavLinkComponent
        to="/analytics"
        NavLinkTitle="Analytics"
        IconElement={
          <Icon
            border="1px"
            padding="1px"
            borderRadius="2px"
            as={colorMode === "light" ? BsBarChart : BsFillBarChartFill}
          />
        }
      />
      <NavLinkComponent
        to="/configure"
        NavLinkTitle="Configure"
        IconElement={<Icon as={colorMode === "light" ? BsGear : BsGearFill} />}
      />
    </>
  );

  const handleLinkRedirects = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    window.open(e.currentTarget.value, "_blank");
  };

  const handleHamburgerNavMenu = () => {
    if (navMenu.isOpen) {
      return (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {links}
          </Stack>
        </Box>
      );
    }
    return null;
  };

  return (
    <>
      <Box
        bg={useColorModeValue("#ECE8FD", "#2F206E")}
        borderBottomRadius="10px"
        borderTop={0}
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        boxShadow={colorMode === "light" ? "0 2px 2px #ddddde" : undefined}
        zIndex={5}
        paddingLeft="1rem"
        paddingRight="1rem"
      >
        <Container
          maxW="inherit"
          padding={!isSmallScreen ? "0 12.5% 0 12.5%" : undefined}
        >
          <Flex
            h={16}
            justifyContent="space-between"
            alignItems="center"
            padding={0}
          >
            <IconButton
              size="md"
              icon={NavButtonIcon}
              aria-label="Open Menu"
              display={{ md: "none" }}
              onClick={navClickAction}
            />

            <HStack as="nav" spacing={2} display={{ base: "none", md: "flex" }}>
              <Wrap display="inline-block">
                <WrapItem>
                  <Avatar
                    size="sm"
                    background={useColorModeValue("#553ACF", "#CCC3F9")}
                    color={useColorModeValue("white", "#2F206E")}
                    name="Singlestore"
                    src={logo}
                  />
                </WrapItem>
              </Wrap>
              <Heading as="h1" size={isSmallScreen ? "sm" : "md"}>
                {isSmallScreen ? "Martech" : "Real-time Digital Marketing"}
              </Heading>
            </HStack>
            <HStack
              as="nav"
              spacing={4}
              alignItems="center"
              justifyContent="right"
              display={{ base: "none", md: "flex" }}
            >
              {links}
            </HStack>

            <Flex alignItems="center" justifyContent="right" gap={7}>
              <Menu>
                <MenuButton alignItems="center">
                  <Icon
                    aria-label="Github Repo"
                    as={colorMode === "light" ? BsShare : BsShareFill}
                    cursor="pointer"
                  />
                </MenuButton>
                <MenuList p={0} minW={0}>
                  <MenuItem p={0} m={0} width="100%" justifyContent="center">
                    <TwitterIcon
                      background="transparent"
                      _hover={{ background: "transparent" }}
                      size="md"
                      onClick={handleLinkRedirects}
                    />
                  </MenuItem>
                  <MenuItem p={0} m={0} width="100%" justifyContent="center">
                    <LinkedinIcon
                      background="transparent"
                      _hover={{ background: "transparent" }}
                      size="md"
                      onClick={handleLinkRedirects}
                    />
                  </MenuItem>
                </MenuList>
              </Menu>
              {themeModeIcon}
              <GithubStargazer
                color="black"
                owner="singlestore-labs"
                repo="demo-realtime-digital-marketing"
              />
            </Flex>
          </Flex>

          {handleHamburgerNavMenu()}
        </Container>
      </Box>
    </>
  );
};
