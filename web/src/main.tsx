import App from "@/components/App";
import { ErrorBoundary } from "@/components/ErrorHandler";
import { chakraTheme } from "@/components/theme";
import { ChakraProvider, useToast } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";

const SWRWrapper = ({ children }: { children: ReactNode }) => {
  const toast = useToast();
  const handleError = (err: Error) => {
    toast({
      title: "An error occurred",
      description: err.message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  return <SWRConfig value={{ onError: handleError }}>{children}</SWRConfig>;
};

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={chakraTheme}>
      <ErrorBoundary>
        <SWRWrapper>
          <RecoilRoot>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
              <App />
            </BrowserRouter>
          </RecoilRoot>
        </SWRWrapper>
      </ErrorBoundary>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
