import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonOptions,
  HTMLChakraProps,
  ThemingProps,
  useBoolean,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { useRecoilValue } from "recoil";

import { Loader } from "@/components/customcomponents/loader/Loader";
import { useUpdateCityList } from "@/data/models/useUpdateCityList";
import { connectionDatabase } from "@/data/recoil";
import {
  useConnectionState,
  useMountedCallback,
  useResetSchema,
} from "@/view/hooks/hooks";

import { PrimaryButton } from "./customcomponents/Button";

export type Props = HTMLChakraProps<"button"> &
  ButtonOptions &
  ThemingProps<"Button"> & {
    skipSeedData?: boolean;
    resetDataOnly?: boolean;
  };

export const ResetSchemaButton = (props: Props) => {
  const { updateCityList } = useUpdateCityList();
  const { connected, initialized } = useConnectionState();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [resettingSchema, resettingSchemaCtrl] = useBoolean();
  const database = useRecoilValue(connectionDatabase);
  const cancelResetSchemaBtn = React.useRef<HTMLButtonElement>(null);
  const { skipSeedData, resetDataOnly, disabled, ...restProps } = props;

  let resetButtonChild: React.ReactNode = "Create Database";
  if (resettingSchema) {
    resetButtonChild = <Loader size="small" />;
  } else if (initialized) {
    resetButtonChild = "Recreate database";
  }

  const onResetSchema = useResetSchema({
    before: React.useCallback(
      () => resettingSchemaCtrl.on(),
      [resettingSchemaCtrl]
    ),
    after: useMountedCallback(() => {
      resettingSchemaCtrl.off();
      updateCityList();
      onClose();
    }, [onClose, resettingSchemaCtrl]),
    includeSeedData: !skipSeedData,
    resetDataOnly: !!resetDataOnly,
  });

  return (
    <>
      <Button
        disabled={!connected || disabled}
        onClick={onOpen}
        {...restProps}
      />

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        leastDestructiveRef={cancelResetSchemaBtn}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {initialized ? "Reset" : "Setup"} database {database}
            </AlertDialogHeader>
            <AlertDialogBody>
              This will {initialized ? "recreate" : "create"} the database
              called {database}. Are you sure?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                background="transparent"
                border="0.5px solid"
                color={useColorModeValue("#553ACF", "#ECE8FD")}
                ref={cancelResetSchemaBtn}
                onClick={onClose}
                disabled={resettingSchema}
              >
                Cancel
              </Button>
              <PrimaryButton
                disabled={resettingSchema}
                onClick={onResetSchema}
                ml={3}
              >
                {resetButtonChild}
              </PrimaryButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
