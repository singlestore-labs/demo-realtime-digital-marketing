import { useConnected } from "@/data/hooks";
import {
  connectionHost,
  connectionPassword,
  connectionUser,
} from "@/data/recoil";
import {
  Badge,
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
import { useRecoilState } from "recoil";

type Props = {
  finalFocusRef: React.RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose(): void;
};

// TODO: show connection status details in the drawer

export const DatabaseDrawer = ({ isOpen, onClose, finalFocusRef }: Props) => {
  const [host, setHost] = useRecoilState(connectionHost);
  const [user, setUser] = useRecoilState(connectionUser);
  const [password, setPassword] = useRecoilState(connectionPassword);
  const connected = useConnected();

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={finalFocusRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Connection Details</DrawerHeader>

        <DrawerBody>
          <Stack spacing={4}>
            <FormControl id="host">
              <FormLabel fontSize="sm" fontWeight="bold">
                Host & Port
              </FormLabel>
              <Input
                placeholder="http://127.0.0.1:8808"
                value={host}
                onChange={(e) => setHost(e.target.value)}
              />
            </FormControl>
            <FormControl id="user">
              <FormLabel fontSize="sm" fontWeight="bold">
                Username
              </FormLabel>
              <Input
                placeholder="admin"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" label="password">
              <FormLabel fontSize="sm" fontWeight="bold">
                Password
              </FormLabel>
              <Input
                type="password"
                placeholder="•••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <Badge size="lg" mr={4} colorScheme={connected ? "green" : "red"}>
            {connected ? "connected" : "disconnected"}
          </Badge>
          <Button onClick={onClose}>Save & Close</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
