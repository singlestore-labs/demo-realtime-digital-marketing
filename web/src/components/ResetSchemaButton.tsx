import { useConnectionState, useResetSchema } from "@/data/hooks";
import { connectionDatabase } from "@/data/recoil";
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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useRecoilValue } from "recoil";

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
    after: useCallback(() => {
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
        colorScheme={initialized ? "green" : "red"}
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
                ref={cancelResetSchemaBtn}
                onClick={resetSchemaDialog.onClose}
                disabled={resettingSchema}
              >
                Cancel
              </Button>
              <Button
                disabled={resettingSchema}
                colorScheme={initialized ? "red" : "green"}
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
