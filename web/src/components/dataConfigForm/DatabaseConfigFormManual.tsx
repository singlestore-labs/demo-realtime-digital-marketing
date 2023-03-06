import { Link,SimpleGrid, Stack, Text, Tooltip, useToast } from "@chakra-ui/react";
import * as React from "react";
import { useRecoilState } from "recoil";

import { ConfigInput } from "@/components/ConfigInput";
import { ScaleFactorSelector } from "@/components/ScaleFactorSelector";
import { isConnected } from "@/data/queries";
import {
  connectionDatabase,
  connectionHost,
  connectionPassword,
  connectionUser,
} from "@/data/recoil";

import { PrimaryButton } from "../customcomponents/Button";

type Props = {
  showDatabase?: boolean;
  showScaleFactor?: boolean;
};

export const DatabaseConfigFormManual = ({
  showDatabase,
  showScaleFactor,
}: Props) => {
  const [host, setHost] = useRecoilState(connectionHost);
  const [user, setUser] = useRecoilState(connectionUser);
  const [password, setPassword] = useRecoilState(connectionPassword);
  const [database, setDatabase] = useRecoilState(connectionDatabase);
  const toast = useToast();

  const [localHost, setLocalHost] = React.useState(host);
  const [localUser, setLocalUser] = React.useState(user);
  const [localPassword, setLocalPassword] = React.useState(password);
  const [localDatabase, setLocalDatabase] = React.useState(database);

  const connect = () => {
    const config = {
      host: localHost,
      password: localPassword,
      user: localUser,
    };
    isConnected(config).then((connected) => {
      let database = "martech";
      if (localDatabase) {
        database = localDatabase;
      }
      if (connected) {
        setHost(localHost);
        setUser(localUser);
        setPassword(localPassword);
        setDatabase(database);
      } else {
        toast({
          title:
            "There was an error connecting to your database. Please check your credentials and try again",
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
            <Link
              href="https://docs.singlestore.com/docs/http-api/"
              isExternal
            >
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
          isDisabled={connectDisabled}
          onClick={connect}
        >
          Connect
        </PrimaryButton>
      </Tooltip>
    </Stack>
  );
};
