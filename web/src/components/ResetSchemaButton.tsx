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

export interface Props
  extends HTMLChakraProps<"button">,
    ButtonOptions,
    ThemingProps<"Button"> {}

export const ResetSchemaButton = (props: Props) => {
  const { connected, initialized } = useConnectionState();
  const resetSchemaDialog = useDisclosure();
  const [resettingSchema, resettingSchemaCtrl] = useBoolean();
  const database = useRecoilValue(connectionDatabase);
  const cancelResetSchemaBtn = React.useRef<HTMLButtonElement>(null);

  const onResetSchema = useResetSchema({
    before: useCallback(() => resettingSchemaCtrl.on(), [resettingSchemaCtrl]),
    after: useCallback(() => {
      resettingSchemaCtrl.off();
      resetSchemaDialog.onClose();
    }, [resetSchemaDialog, resettingSchemaCtrl]),
  });

  return (
    <>
      <Button
        disabled={!connected}
        onClick={resetSchemaDialog.onOpen}
        {...props}
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
              This will {initialized ? "recreate" : "create"} database{" "}
              {database}. Are you sure?
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
                colorScheme="red"
                onClick={onResetSchema}
                ml={3}
              >
                {resettingSchema ? <Spinner /> : "Reset Schema"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
