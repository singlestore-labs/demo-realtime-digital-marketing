import { useCallback, useRef } from "react";

export type Cancel = () => void;
export type Reader<Msg> = (msg: Msg) => void;
export type OnMsg<Msg> = (r: Reader<Msg>) => Cancel;

export type Pipe<Msg> = {
  write: (msg: Msg) => void;
  onMsg: OnMsg<Msg>;
};

export const usePipe = <Msg>(): Pipe<Msg> => {
  const subscriberRef = useRef<Reader<Msg>>();

  return {
    write: useCallback((msg: Msg) => {
      if (subscriberRef.current) {
        subscriberRef.current(msg);
      }
    }, []),

    onMsg: useCallback((r: Reader<Msg>) => {
      if (subscriberRef.current) {
        throw new Error("Pipe already subscribed");
      }
      subscriberRef.current = r;
      return () => {
        subscriberRef.current = undefined;
      };
    }, []),
  };
};
