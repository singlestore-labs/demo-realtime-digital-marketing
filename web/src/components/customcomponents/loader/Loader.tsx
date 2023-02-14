import "@/components/customcomponents/loader/loader.scss";

import classnames from "classnames";
import * as React from "react";

import { CenteringWrapper } from "@/components/customcomponents/loader/CenteringWrapper";

type Props = {
  className?: string;
  size: "small" | "large";
  rightMargin?: boolean;
  centered?: boolean;
  message?: React.ReactNode;
  inlineMessage?: boolean;
};

function SvgSmall() {
  // must match up with the variables in loading.scss!
  const svgSize = 16;
  const strokeWidth = 2;

  return (
    <svg
      className="svg-small"
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
    >
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="4.769"
          x2="4.769"
          y1="-.056"
          y2="24.008"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF7BFF" />
          <stop offset=".072" stopColor="#F46BFF" />
          <stop offset=".266" stopColor="#D945FF" />
          <stop offset=".458" stopColor="#C527FF" />
          <stop offset=".646" stopColor="#B611FF" />
          <stop offset=".829" stopColor="#AD04FF" />
          <stop offset="1" stopColor="#A0F" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="27.009"
          x2="27.009"
          y1="-.001"
          y2="24.067"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF7BFF" />
          <stop offset=".072" stopColor="#F46BFF" />
          <stop offset=".266" stopColor="#D945FF" />
          <stop offset=".458" stopColor="#C527FF" />
          <stop offset=".646" stopColor="#B611FF" />
          <stop offset=".829" stopColor="#AD04FF" />
          <stop offset="1" stopColor="#A0F" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="20.839"
          x2="20.839"
          y1="23.896"
          y2=".001"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF7BFF" />
          <stop offset=".072" stopColor="#F46BFF" />
          <stop offset=".266" stopColor="#D945FF" />
          <stop offset=".458" stopColor="#C527FF" />
          <stop offset=".646" stopColor="#B611FF" />
          <stop offset=".829" stopColor="#AD04FF" />
          <stop offset="1" stopColor="#A0F" />
        </linearGradient>
        <linearGradient
          id="paint3_linear"
          x1="11.216"
          x2="11.216"
          y1="23.987"
          y2="-.013"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF7BFF" />
          <stop offset=".072" stopColor="#F46BFF" />
          <stop offset=".266" stopColor="#D945FF" />
          <stop offset=".458" stopColor="#C527FF" />
          <stop offset=".646" stopColor="#B611FF" />
          <stop offset=".829" stopColor="#AD04FF" />
          <stop offset="1" stopColor="#A0F" />
        </linearGradient>
        <linearGradient
          id="paint4_linear"
          x1="15.319"
          x2="15.319"
          y1="23.995"
          y2="-.023"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF7BFF" />
          <stop offset=".072" stopColor="#F46BFF" />
          <stop offset=".266" stopColor="#D945FF" />
          <stop offset=".458" stopColor="#C527FF" />
          <stop offset=".646" stopColor="#B611FF" />
          <stop offset=".829" stopColor="#AD04FF" />
          <stop offset="1" stopColor="#A0F" />
        </linearGradient>
        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#AA01FF" />
          <stop offset="75%" stopColor="#8327F6" />
          <stop offset="100%" stopColor="#AA01FF" />
        </linearGradient>
      </defs>

      <circle
        className="circle"
        cx={svgSize / 2}
        cy={svgSize / 2}
        r={svgSize / 2 - strokeWidth / 2}
        stroke="var(--sui-color-background-neutral-3)"
      />
      <circle
        className="circle circle-stroke"
        cx={svgSize / 2}
        cy={svgSize / 2}
        r={svgSize / 2 - strokeWidth / 2}
        stroke="url(#linear)"
      />
    </svg>
  );
}

function SvgLarge() {
  const svgSize = 48;

  return (
    <svg
      className="svg-large"
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
    >
      <defs>
        <radialGradient
          id="paint0_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(-69.643 40.723 11.687) scale(47.1449 355.25)"
        >
          <stop stopColor="#F129FF" stopOpacity=".55" />
          <stop offset=".494" stopColor="#DB47FF" stopOpacity=".35" />
          <stop offset="1" stopColor="#FF7BFF" stopOpacity=".15" />
        </radialGradient>
        <radialGradient
          id="paint1_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(50.40044 -39.20037 48.6011 62.48708 -12.2 35.6)"
        >
          <stop stopColor="#EB54EB" stopOpacity=".5" />
          <stop offset=".569" stopColor="#A0F" stopOpacity=".75" />
          <stop offset="1" stopColor="#4F34C7" stopOpacity="1" />
        </radialGradient>
        <radialGradient
          id="paint2_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(-103.016 31.285 14.299) scale(40.8498 81.749)"
        >
          <stop stopColor="#D942FF" stopOpacity="0.6" />
          <stop offset=".469" stopColor="#B41CEB" stopOpacity=".7" />
          <stop offset=".999" stopColor="#9F1BE0" stopOpacity=".85" />
        </radialGradient>
      </defs>

      <path
        className="path-logo-one"
        d="M36.857 9.44C34.914 5.035 30.229 1.43 25.086 0c12.571.343 22.913 11.156 22.913 23.857.05 11.505-8.058 21.162-18.815 23.567C12 43.2 10.352 30.74 10.344 24.086c.057 7.552 6.17 13.559 13.714 13.616 4.857.057 9.085-2.288 11.828-6.694 3.257-5.377 3.942-14.417.971-21.568z"
        fill="url(#paint0_radial)"
      />
      <path
        className="path-logo-two"
        d="M34.058 10.125c-1.829-3.833-5.6-6.865-10.228-8.066-1.029-.287-2.115-.401-3.315-.458-1.77 0-3.485.229-5.257.686-4.4 1.316-7.485 3.89-9.313 5.893-2.343 2.689-3.886 5.492-4.8 8.296 0 .057-.057.114-.057.229-.058.228-.286.915-.286 1.087-.057.114-.057.286-.114.4l-.172.686c0 .058 0 .115-.057.172-1.486 7.38.982 14.003 2.468 16.463.372.616.677 1.13.983 1.6C.538 18.806 10.23 10.068 21.258 9.84c5.771-.114 11.543 2.231 14.342 6.923-.17-2.575-.342-4.005-1.542-6.637z"
        fill="url(#paint1_radial)"
      />
      <path
        className="path-logo-three"
        d="M3.91 37.113c-.189-.29.203.336 0 0C.538 18.806 10.23 10.068 21.258 9.84c2.603-.051 5.206.397 7.537 1.336a13.201 13.201 0 00-4.739-.877c-7.77 0-13.713 6.236-13.713 13.788.008 6.654 1.655 19.114 18.84 23.338-1.653.37-3.368.568-5.127.576-8.797.056-15.97-3.796-20.146-10.887z"
        fill="url(#paint2_radial)"
      />
    </svg>
  );
}

export function Loader({
  size,
  className,
  rightMargin,
  centered = true,
  message,
  inlineMessage,
}: Props) {
  const classes = classnames("single-common-components-loading", className, {
    "right-margin": rightMargin,
  });

  let svg;
  if (size === "small") {
    svg = <SvgSmall />;
  } else {
    svg = <SvgLarge />;
  }

  const innerClasses = classnames("inner", {
    "inline-message": inlineMessage,
  });

  let messageNode;
  if (message) {
    messageNode = <span className="message">{message}</span>;
  }

  const inner = (
    <span className={innerClasses}>
      {svg}
      {messageNode}
    </span>
  );

  if (centered) {
    return <CenteringWrapper className={classes}>{inner}</CenteringWrapper>;
  }

  return <span className={classes}>{inner}</span>;
}
