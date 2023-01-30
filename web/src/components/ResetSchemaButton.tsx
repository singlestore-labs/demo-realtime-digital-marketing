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
  Spinner,
  ThemingProps,
  useBoolean,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useRecoilValue } from "recoil";

import {
  useConnectionState,
  useMountedCallback,
  useResetSchema,
} from "@/data/Hooks/hooks";
import { connectionDatabase } from "@/data/recoil";

export type Props = HTMLChakraProps<"button"> &
  ButtonOptions &
  ThemingProps<"Button"> & {
    skipSeedData?: boolean;
    resetDataOnly?: boolean;
  };

export const ResetSchemaButton = (props: Props) => {
  const { connected, initialized } = useConnectionState();
  const resetSchemaDialog = useDisclosure();
  const [resettingSchema, resettingSchemaCtrl] = useBoolean();
  const database = useRecoilValue(connectionDatabase);
  const cancelResetSchemaBtn = React.useRef<HTMLButtonElement>(null);
  const { skipSeedData, resetDataOnly, disabled, ...restProps } = props;

  const onResetSchema = useResetSchema({
    before: useCallback(() => resettingSchemaCtrl.on(), [resettingSchemaCtrl]),
    after: useMountedCallback(() => {
      resettingSchemaCtrl.off();
      resetSchemaDialog.onClose();
    }, [resetSchemaDialog, resettingSchemaCtrl]),
    includeSeedData: !skipSeedData,
    resetDataOnly: !!resetDataOnly,
  });

  return (
    <>
      <Button
        disabled={!connected || disabled}
        onClick={resetSchemaDialog.onOpen}
        {...restProps}
      />

      <AlertDialog
        isOpen={resetSchemaDialog.isOpen}
        onClose={resetSchemaDialog.onClose}
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
                onClick={resetSchemaDialog.onClose}
                disabled={resettingSchema}
              >
                Cancel
              </Button>
              <Button
                disabled={resettingSchema}
                background={useColorModeValue("#ECE8FD", "#2F206E")}
                color={useColorModeValue("#553ACF", "#ECE8FD")}
                onClick={onResetSchema}
                ml={3}
              >
                {resettingSchema ? (
                  <Spinner />
                ) : initialized ? (
                  "Recreate database"
                ) : (
                  "Create database"
                )}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
