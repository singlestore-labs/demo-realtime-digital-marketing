import "@/components/loader/centering-wrapper.scss";

import { Box } from "@chakra-ui/react";
import classnames from "classnames";
import * as React from "react";

type Props = {
    className?: string;
    vertical?: boolean;
    children: React.ReactNode;
};

// Wraps an element such as a FeatureCard on pages that display only one or a few prominently centered components as
// content.
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

        return <Box height="inherit" justifyContent="center" alignItems="center" className={classes}>{children}</Box>;
    }
}
