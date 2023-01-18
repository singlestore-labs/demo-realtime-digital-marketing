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
  BsLinkedin,
  BsMap,
  BsMapFill,
  BsShare,
  BsShareFill,
} from "react-icons/bs";
import { VscTwitter } from "react-icons/vsc";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { NavLink as RouterLink } from "react-router-dom";
import { GithubStargazer } from "../GithubButtons";

export const Nav = () => {
  const { toggleColorMode } = useColorMode();
  const { colorMode } = useColorMode();
  const navMenu = useDisclosure();
  const [isSmallScreen] = useMediaQuery("(max-width: 640px)");

  const NavLinkActiveButtonStyle = {
    background: useColorModeValue("#4F34C7", "#CCC3F9"),
    color: useColorModeValue("#FFFFFF", "#2F206E"),
  };

  const LinksIntenralComponent = (props: {
    NavLinkTitle: string;
    IconElement: ReactElement;
  }) => {
    return (
      <Flex gap={2} alignItems={"center"}>
        <b>{props.NavLinkTitle} </b>
        <Stack fontSize={"0.8em"} alignItems={"center"}>
          {props.IconElement}
        </Stack>
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
        to={"/analytics"}
        NavLinkTitle={"Analytics"}
        IconElement={
          <Icon
            border={"1px"}
            padding={"1px"}
            borderRadius={"2px"}
            as={colorMode === "light" ? BsBarChart : BsFillBarChartFill}
          />
        }
      />
      <NavLinkComponent
        to={"/configure"}
        NavLinkTitle={"Configure"}
        IconElement={<Icon as={colorMode === "light" ? BsGear : BsGearFill} />}
      />
    </>
  );

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
        <Container
          maxW="inherit"
          padding={!isSmallScreen ? " 0 12.5% 0 12.5%" : undefined}
        >
          <Flex
            h={16}
            justifyContent={"space-between"}
            alignItems={"center"}
            padding={0}
          >
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
              <Menu>
                <MenuButton as={"button"}>
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
                </MenuButton>
                <MenuList p={0} minW="0">
                  <MenuItem
                    onClick={() =>
                      window.open(
                        "https://twitter.com/intent/tweet?text=Exciting%20MarTech%20demo%20application%20from%20SingleStoreDB%20showcasing%20its%20unique%20capabilities!%20As%20a%20demo%20app%2C%20it%20gives%20you%20a%20taste%20of%20what%27s%20possible%20when%20using%20SingleStoreDB%20for%20your%20own%20projects%2C%20https%3A%2F%2Fdigital-marketing.labs.singlestore.com.%20%0A%0A%23SingleStoreDB%20%23database%20%23digitalmarketing%20%23appdevelopment%20",
                        "_blank"
                      )
                    }
                  >
                    <IconButton
                      aria-label="Github Repo"
                      size="sm"
                      background={colorMode === "light" ? undefined : "black"}
                      icon={<VscTwitter size="1em" />}
                    />
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      window.open(
                        "https://www.linkedin.com/sharing/share-offsite/?url=https://www.figma.com/file/zLZinfGmhUmnA6fWJedQVc/RealTime-Digital-Marketing-App?node-id=887%3A18691&t=x2neHA3Rtfjx7ooc-4",
                        "_blank"
                      )
                    }
                  >
                    <IconButton
                      aria-label="Github Repo"
                      size="sm"
                      background={colorMode === "light" ? undefined : "black"}
                      icon={<BsLinkedin size="1em" />}
                    />
                  </MenuItem>
                </MenuList>
              </Menu>
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
