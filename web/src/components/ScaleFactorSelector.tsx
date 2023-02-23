import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";

import { configScaleFactor } from "@/data/recoil";
import { getScaleFactor, ScaleFactors } from "@/scalefactors";

export const ScaleFactorSelector = () => {
  const [scaleFactor, setScaleFactor] = useRecoilState(configScaleFactor);

  return (
    <FormControl>
      <FormLabel
        mb={1}
        fontSize="xs"
        fontWeight="bold"
        textTransform="uppercase"
      >
        Scale Factor
      </FormLabel>
      <Select
        size="sm"
        required
        value={scaleFactor.name}
        onChange={(ev) => {
          const v = ev.target.value;
          setScaleFactor(getScaleFactor(v));
        }}
      >
        {ScaleFactors.map((f) => (
          <option value={f.name} key={f.name}>
            {f.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
