import * as React from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";

import { userSessionID } from "@/data/recoil";
import { useConnectionState } from "@/view/hooks/hooks";

export function trackAnalyticsEvent(
  event: string,
  params?: Record<string, string | number | boolean>
) {
  if (window.analytics) {
    window.analytics.track(`rtdm-${event}`, params);
  } else {
    console.warn("window.analytics is not defined");
  }
}

export function useAnalytics() {
  const location = useLocation();
  const { connectionType } = useConnectionState();
  const [userID, setUserID] = useRecoilState(userSessionID);

  React.useEffect(() => {
    const { pathname } = location;
    trackAnalyticsEvent("change-page", { pathname });
  }, [location]);

  React.useEffect(() => {
    if (connectionType) {
      trackAnalyticsEvent("connection-successful", { connectionType });
    }
  }, [connectionType]);

  React.useEffect(() => {
    if (window.analytics) {
      window.analytics.identify(userID);
    } else {
      console.warn("window.analytics is not defined");
    }
  }, [userID, setUserID]);
}
