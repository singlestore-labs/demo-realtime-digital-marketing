import { configScaleFactor } from "@/data/recoil";
import { isScaleFactor, ScaleFactors } from "@/scalefactors";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useRecoilState } from "recoil";

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
        value={scaleFactor}
        onChange={(ev) => {
          const v = ev.target.value;
          if (isScaleFactor(v)) {
            setScaleFactor(v);
          }
        }}
      >
        {Object.keys(ScaleFactors)
          .sort()
          .map((f) => (
            <option value={f} key={f}>
              {f}
            </option>
          ))}
      </Select>
    </FormControl>
  );
};
