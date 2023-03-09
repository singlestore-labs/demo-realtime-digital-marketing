import {
  Box,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import * as React from "react";
import { useRecoilState } from "recoil";

import { ConfigInput } from "@/components/ConfigInput";
import { ScaleFactorSelector } from "@/components/ScaleFactorSelector";
import { connectToDB } from "@/data/queries";
import {
  connectionDatabase,
  connectionHost,
  connectionPassword,
  connectionUser,
} from "@/data/recoil";

import { PrimaryButton } from "../customcomponents/Button";
import { Loader } from "../customcomponents/loader/Loader";

type Props = {
  showDatabase?: boolean;
  showScaleFactor?: boolean;
};

export const DatabaseConfigFormManual = ({
  showDatabase,
  showScaleFactor,
}: Props) => {
  const toast = useToast();
  const [loading, setLoading] = React.useState(false);
  const [host, setHost] = useRecoilState(connectionHost);
  const [user, setUser] = useRecoilState(connectionUser);
  const [password, setPassword] = useRecoilState(connectionPassword);
  const [database, setDatabase] = useRecoilState(connectionDatabase);

  const [localHost, setLocalHost] = React.useState(host);
  const [localUser, setLocalUser] = React.useState(user);
  const [localPassword, setLocalPassword] = React.useState(password);
  const [localDatabase, setLocalDatabase] = React.useState(database);

  const connect = () => {
    setLoading(true);
    const config = {
      host: localHost,
      password: localPassword,
      user: localUser,
    };
    connectToDB(config).then((connected) => {
      setLoading(false);
      let database = "martech";
      if (localDatabase) {
        database = localDatabase;
      }
      if (connected === true) {
        setHost(localHost);
        setUser(localUser);
        setPassword(localPassword);
        setDatabase(database);
      } else {
        toast({
          title: "An error occured",
          description: `${connected.message}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    });
  };

  const connectDisabled =
    localHost === "" || localUser === "" || localPassword === "";

  let databaseInput;
  if (showDatabase) {
    databaseInput = (
      <ConfigInput
        label="Database"
        placeholder="martech"
        required
        value={localDatabase}
        setValue={setLocalDatabase}
      />
    );
  }

  let scaleFactor;
  if (showScaleFactor) {
    scaleFactor = <ScaleFactorSelector />;
  }

  let connectButtonConatiner = <>Connect</>;
  if (loading) {
    connectButtonConatiner = (
      <Box display="flex">
        <Loader size="small" />
        &nbsp;Connecting...
      </Box>
    );
  }

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key.toLowerCase() === "enter") {
      connect();
    }
  };

  return (
    <Stack spacing={4} onKeyDown={handleEnterKeyPress}>
      <ConfigInput
        label="Host & Port"
        placeholder="http://127.0.0.1:8808"
        value={localHost}
        required
        setValue={setLocalHost}
        helpText={
          <Text>
            The protocol (http, https), host, and port for the SingleStore{" "}
            <Link href="https://docs.singlestore.com/docs/http-api/" isExternal>
              Data API
            </Link>
            .
          </Text>
        }
      />
      <SimpleGrid columns={2} gap={2}>
        <ConfigInput
          label="Username"
          required
          helpText="Fill in the Security credentials of your workspace group."
          placeholder="admin"
          value={localUser}
          setValue={setLocalUser}
        />
        <ConfigInput
          label="Password"
          required
          placeholder=""
          value={localPassword}
          setValue={setLocalPassword}
          type="password"
        />
      </SimpleGrid>
      {databaseInput}
      {scaleFactor}

      <Tooltip
        shouldWrapChildren
        isDisabled={!connectDisabled}
        hasArrow
        label="Fill in the required details to connect"
      >
        <PrimaryButton
          width="100%"
          alignItems="center"
          isDisabled={connectDisabled}
          onClick={connect}
        >
          {connectButtonConatiner}
        </PrimaryButton>
      </Tooltip>
    </Stack>
  );
};
