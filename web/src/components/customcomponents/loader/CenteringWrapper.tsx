import { Box } from "@chakra-ui/react";
import classnames from "classnames";
import * as React from "react";

import "@/components/customcomponents/loader/centering-wrapper.scss";

type Props = {
  className?: string;
  vertical?: boolean;
  children: React.ReactNode;
};

export class CenteringWrapper extends React.Component<Props> {
  render() {
    const { className, vertical, children } = this.props;

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
  }
}
