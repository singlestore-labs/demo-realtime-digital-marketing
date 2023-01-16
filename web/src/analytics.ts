import { useConnectionState } from "@/data/Hooks/hooks";
import { userSessionID } from "@/data/recoil";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";

export function trackAnalyticsEvent(
  event: string,
  params?: Record<string, string | number>
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

  useEffect(() => {
    const { pathname } = location;
    trackAnalyticsEvent("change-page", { pathname });
  }, [location]);

  useEffect(() => {
    if (connectionType) {
      trackAnalyticsEvent("connection-successful", { connectionType });
    }
  }, [connectionType]);

  useEffect(() => {
    if (window.analytics) {
      window.analytics.identify(userID);
    } else {
      console.warn("window.analytics is not defined");
    }
  }, [userID, setUserID]);
}
