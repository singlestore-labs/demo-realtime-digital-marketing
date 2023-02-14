import { SimpleGrid, Stack, Text } from "@chakra-ui/react";
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

type Props = {
  showDatabase?: boolean;
  showScaleFactor?: boolean;
};

export const DatabaseConfigForm = ({
  showDatabase,
  showScaleFactor,
}: Props) => {
  const [host, setHost] = useRecoilState(connectionHost);
  const [user, setUser] = useRecoilState(connectionUser);
  const [password, setPassword] = useRecoilState(connectionPassword);
  const [database, setDatabase] = useRecoilState(connectionDatabase);

  let databaseInput;
  if (showDatabase) {
    databaseInput = (
      <ConfigInput
        label="Database"
        placeholder="martech"
        value={database}
        setValue={setDatabase}
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
        value={host}
        setValue={setHost}
        helpText={
          <Text>
            The protocol (http, https), host, and port for the SingleStore
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
          helpText={
            <Text>
              Fill in the Security credentials of your workspace group.
            </Text>
          }
          placeholder="admin"
          value={user}
          setValue={setUser}
        />
        <ConfigInput
          label="Password"
          placeholder=""
          value={password}
          setValue={setPassword}
          type="password"
        />
      </SimpleGrid>
      {databaseInput}
      {scaleFactor}
    </Stack>
  );
};
