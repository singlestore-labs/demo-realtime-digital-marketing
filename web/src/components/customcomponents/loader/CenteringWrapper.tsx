import { Box } from "@chakra-ui/react";
import classnames from "classnames";
import * as React from "react";

import "@/components/customcomponents/loader/centering-wrapper.scss";

type Props = {
  className?: string;
  vertical?: boolean;
  children: React.ReactNode;
};

export const CenteringWrapper = (props: Props) => {
  const { className, vertical, children } = props;

  const classes = classnames(
    "single-common-components-centering-wrapper",
    "single-common-components-centering-wrapper.vertical",
    className,
    {
      vertical,
    }
  );

  return (
    <Box
      height="inherit"
      justifyContent="center"
      alignItems="center"
      className={classes}
    >
      {children}
    </Box>
  );
};
