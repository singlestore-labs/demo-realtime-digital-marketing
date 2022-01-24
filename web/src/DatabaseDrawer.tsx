import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";

type Props = {
  finalFocusRef: React.RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose(): void;
};

// TODO: show connection status details in the drawer

export const DatabaseDrawer = ({ isOpen, onClose, finalFocusRef }: Props) => (
  <Drawer
    isOpen={isOpen}
    placement="right"
    onClose={onClose}
    finalFocusRef={finalFocusRef}
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>Connection Status</DrawerHeader>

      <DrawerBody>
        <Stack spacing={4}>
          <FormControl id="host">
            <FormLabel fontSize="sm" fontWeight="bold">
              Host
            </FormLabel>
            <Input placeholder="127.0.0.1" />
          </FormControl>
          <FormControl id="port">
            <FormLabel fontSize="sm" fontWeight="bold">
              Port
            </FormLabel>
            <Input placeholder="3306" type="number" />
          </FormControl>
          <FormControl id="user">
            <FormLabel fontSize="sm" fontWeight="bold">
              Username
            </FormLabel>
            <Input placeholder="admin" />
          </FormControl>
          <FormControl id="password" label="password">
            <FormLabel fontSize="sm" fontWeight="bold">
              Password
            </FormLabel>
            <Input type="password" placeholder="•••••••••••" />
          </FormControl>
        </Stack>
      </DrawerBody>

      <DrawerFooter>
        <Button onClick={onClose}>Save & Close</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);
