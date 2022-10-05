import { useConnectionState } from "@/data/hooks";
import { userSessionID } from "@/data/recoil";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

export function trackAnalyticsEvent(
  event: string,
  params?: Record<string, string | number>
) {
  window.analytics.track(`rtdm-${event}`, params);
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
    if (userID === "") {
      const newUserID = uuidv4();
      setUserID(newUserID);
    }
    if (window.analytics) {
      window.analytics.identify(userID);
    } else {
      console.warn("Analytics are not defined");
    }
  }, [userID, setUserID]);
}
