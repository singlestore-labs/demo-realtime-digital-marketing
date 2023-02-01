import { InfoIcon } from "@chakra-ui/icons";
import { Flex, Grid, GridItem, Heading, Image, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

import DashboardControllerIamge from "@/assets/dashboard-controller-snapshot.svg";
import GraphicalBackground2 from "@/assets/graphical-background-design-2.svg";
import SinglestoreLogo from "@/assets/singlestore-logo-filled-sm.svg";
import { DatabaseConfigForm } from "@/components/DatabaseConfigForm";
import { useConnectionState } from "@/view/hooks/hooks";

export const HomePage: React.FC<{
	redirectToHomePage: boolean,
	setRedirectToHomaePage: (setStatus: boolean) => void,
	updateCityList: () => void
}> = ({ redirectToHomePage, updateCityList, setRedirectToHomaePage}) => {
	const {connected} = useConnectionState();
	const navigate = useNavigate();
	const fontColor = useColorModeValue("#553ACF", "#CCC3F9");

	React.useEffect(() => {
		if (connected) {
			setRedirectToHomaePage(false);
		}
	}, [connected, setRedirectToHomaePage]);

	React.useEffect(() => {
		if (!redirectToHomePage) {
			updateCityList();
			const urlSearchParams = new URLSearchParams(location.search.slice(1));
			const queryObject = JSON.parse(JSON.stringify(Object.fromEntries(urlSearchParams)));
			if (queryObject.redirect) {
				navigate(queryObject.redirect);
			} else {
				navigate('/dashboard');
			}
		}
	}, [redirectToHomePage, navigate, updateCityList]);

	return <Grid templateColumns="repeat(2, 1fr)" width="100%" height="100%" justifyContent="center" alignItems="center">
		<GridItem padding="10% 10% 10% 20%">
			<Stack spacing={4}>
				<Heading>
					<Image src={SinglestoreLogo} />
				</Heading>
				<Heading>
					<Text>Realtime Digital Marketing</Text>
				</Heading>
				<Text size="1.2em">
					Watch SingleStoreDB serve ads to millions of simulated subscribers based on their behavior, purchases, request history, and geolocation. 
				</Text>
				<Tabs variant="unstyled">
					<TabList><Tab justifyContent="center" _selected={{ color: fontColor, borderBottom: `2px solid ${useColorModeValue("#553ACF", "#CCC3F9")}` }} fontWeight="bold" gap={1}>Connect to Singlestore</Tab></TabList>
					<TabPanels padding={0} margin={0}>
						<TabPanel paddingLeft={0} paddingTop={5} margin={0}>
							<DatabaseConfigForm showDatabase={true} />
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Stack>
		</GridItem>
		<GridItem
			backgroundImage={GraphicalBackground2}
			justifyContent="center"
			alignItems="center"
			backgroundSize="130%"
			height="100%"
			width="100%"
			backgroundPosition="left"
			backgroundRepeat="no-repeat"
			
		>
			<Flex
				direction="row-reverse"
				height="100%"
				width="100%"
				alignItems="center"
			>
				<Image width="80%" objectFit="cover"   src={DashboardControllerIamge} />
			</Flex>
		</GridItem>
	</Grid>;
  };
