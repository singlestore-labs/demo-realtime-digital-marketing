import {
  Box,
  Grid,
  GridItem,
  Icon,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { HiChevronRight } from "react-icons/hi";

import CreateWorkspaceButtonSVG from "@/assets/howitworks/create-workspace-button.svg";
import RTDMConnectButtonSVG from "@/assets/howitworks/rtdm-connect-button.svg";
import WorkspaceConnectOptionSVG from "@/assets/howitworks/workspace-connect-direct.svg";

import { InvertedPrimaryButton } from "./customcomponents/Button";

const HOW_IT_WORKS_STEPS = [
  {
    title: "1. Enter your workspace host address.",
    description: (
      <>
        Go to your SingleStoreDB <b>workspace group page</b> and copy
        SinglestoreDB endpoints by clicking in workspace Connect options.
      </>
    ),
    imageSrc: WorkspaceConnectOptionSVG,
  },
  {
    title: "2. Paste Workspace Group's password",
    description: (
      <>
        This can be obtained from the <b>Connect Directly flyout</b>. The
        password can be reset in the Access tab of your Workspace Group.
      </>
    ),
    imageSrc: CreateWorkspaceButtonSVG,
  },
  {
    title: "3. Select Martech database and connect",
    description: (
      <>
        Follow the <b>Try with sample data</b> tutorial in SingleStoreDB help
        menu to know how to create and connect to a Martech database.
      </>
    ),
    imageSrc: RTDMConnectButtonSVG,
  },
];

const StepSeparator = () => (
  <Box
    display="inline-flex"
    padding={3}
    justifyContent="center"
    alignItems="center"
  >
    <Icon
      as={HiChevronRight}
      color={useColorModeValue("white", "#2F206E")}
      background={useColorModeValue("#553ACF", "#CCC3F9")}
      borderRadius="50%"
      fontSize="1.2em"
    />
  </Box>
);

export const HowItWorksModal = () => {
  const [showModal, setShowModal] = React.useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const SingleStepContainer = ({
    title,
    description,
    imageSrc,
  }: {
    title: string;
    description: React.ReactNode;
    imageSrc: string;
  }) => (
    <GridItem
      alignItems="center"
      justifyContent="center"
      display="flex"
      flexDirection="column"
      textAlign="center"
      gap="8px"
    >
      <Image
        src={imageSrc}
        width="70%"
        objectFit="contain"
        marginBottom="16px"
      />
      <Text fontSize="md" fontWeight="bold">
        {title}
      </Text>
      <Text fontSize="sm">{description}</Text>
    </GridItem>
  );

  const StepGridItems = () => {
    const numOfSteps = HOW_IT_WORKS_STEPS.length;
    return (
      <>
        {HOW_IT_WORKS_STEPS.map(({ title, description, imageSrc }, index) => (
          <React.Fragment key={index}>
            <SingleStepContainer
              title={title}
              description={description}
              imageSrc={imageSrc}
            />
            {/* We add a arrow separator in between each steps.*/}
            {index < numOfSteps - 1 && <StepSeparator />}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <>
      <Link onClick={openModal}>How it works?</Link>
      <Modal size="6xl" isOpen={showModal} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent
          display="flex"
          alignItems="center"
          padding="24px 26px 24px 26px"
        >
          <Stack justifyContent="center" alignItems="center" gap="26px">
            <ModalHeader fontSize="26px" fontWeight="bold" padding="8px">
              How Real-Time Digital marketing app works?
            </ModalHeader>
            <ModalCloseButton
              _focus={{ boxShadow: "none" }}
            />
            <ModalBody padding={0} margin={0}>
              <Grid display="flex" padding={0} margin={0}>
                <StepGridItems />
              </Grid>
            </ModalBody>
            <ModalFooter margin="8px">
              <InvertedPrimaryButton
                onClick={closeModal}
                fontSize="1.2rem"
                lineHeight="20px"
              >
                Start now
              </InvertedPrimaryButton>
            </ModalFooter>
          </Stack>
        </ModalContent>
      </Modal>
    </>
  );
};
