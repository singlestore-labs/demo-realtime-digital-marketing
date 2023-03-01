import { ChakraProvider, IToast, useToast } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot, useRecoilValue } from "recoil";
import { SWRConfig } from "swr";

import App from "@/App";
import { ClientErrorBoundary, ErrorBoundary } from "@/components/ErrorHandler";
import { chakraTheme } from "@/components/theme";
import { resettingSchema } from "@/data/recoil";

const SWRWrapper = ({ children }: { children: React.ReactNode }) => {
  const isResettingSchema = useRecoilValue(resettingSchema);
  const toast = useToast();
  const handleError = (err: Error) => {
    if (isResettingSchema) {
      console.warn("Ignoring error while resetting schema", err);
    } else {
      console.error(err);
      const id = "swr-error";
      const t: IToast = {
        id: "swr-error",
        title: "An error occurred",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      };
      if (toast.isActive(id)) {
        toast.update(id, t);
      } else {
        toast({ id, ...t });
      }
    }
  };

  return <SWRConfig value={{ onError: handleError }}>{children}</SWRConfig>;
};

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={chakraTheme}>
      <ErrorBoundary>
        <RecoilRoot>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <SWRWrapper>
              <ClientErrorBoundary>
                <App />
              </ClientErrorBoundary>
            </SWRWrapper>
          </BrowserRouter>
        </RecoilRoot>
      </ErrorBoundary>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
