import { SimpleGrid, Stack, Text, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

import { ConfigInput } from "@/components/ConfigInput";
import { ScaleFactorSelector } from "@/components/ScaleFactorSelector";
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

  const [localHost, setLocalHost] = useState(host);
  const [localUser, setLocalUser] = useState(user);
  const [localPassword, setLocalPassword] = useState(password);
  const [localDatabase, setLocalDatabase] = useState(database);

  const connect = () => {
    setHost(localHost);
    setUser(localUser);
    setPassword(localPassword);
    setDatabase(localDatabase);
  };

  const connectDisabled =
    localHost === "" ||
    localUser === "" ||
    localPassword === "" ||
    localDatabase === "";

  let databaseInput;
  if (showDatabase) {
    databaseInput = (
      <ConfigInput
        label="Database"
        placeholder="martech"
        required={true}
        value={localDatabase}
        setValue={setLocalDatabase}
      />
    );
  }

  let scaleFactor;
  if (showScaleFactor) {
    scaleFactor = <ScaleFactorSelector />;
  }

  return (
    <Stack spacing={4}>
      <ConfigInput
        label="Host & Port"
        placeholder="http://127.0.0.1:8808"
        value={localHost}
        required={true}
        setValue={setLocalHost}
        helpText={
          <Text>
            The protocol (http, https), host, and port for the SingleStore{" "}
            <Link
              to="https://docs.singlestore.com/docs/http-api/"
              target="_blank"
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
          required={true}
          helpText={
            <Text>
              Fill in the Security credentials of your workspace group.
            </Text>
          }
          placeholder="admin"
          value={localUser}
          setValue={setLocalUser}
        />
        <ConfigInput
          label="Password"
          required={true}
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
