import { SimpleGrid, Stack } from "@chakra-ui/react";
import { useRecoilState } from "recoil";

import { ConfigInput } from "@/components/ConfigInput";
import { MarkdownText } from "@/components/MarkdownText";
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

  return (
    <Stack spacing={4}>
      <ConfigInput
        label="Host & Port"
        placeholder="http://127.0.0.1:8808"
        value={host}
        setValue={setHost}
        helpText={
          <MarkdownText>
            {`
              The protocol (http, https), host, and port for the SingleStore
              [Data API][1].

              [1]: https://docs.singlestore.com/docs/http-api/
            `}
          </MarkdownText>
        }
      />
      <SimpleGrid columns={2} gap={2}>
        <ConfigInput
          label="Username"
          helpText={
            <MarkdownText>
              Fill in the Security credentials set for the workspace group.
            </MarkdownText>
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
        {showDatabase && (
          <ConfigInput
            label="Database"
            placeholder="martech"
            value={database}
            setValue={setDatabase}
          />
        )}
        {showScaleFactor && <ScaleFactorSelector />}
      </SimpleGrid>
    </Stack>
  );
};
