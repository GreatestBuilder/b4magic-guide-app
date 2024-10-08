import { useCallback, useState } from "react";

const getWindowDimensions = () => {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }
  return {
    width: 0,
    height: 0,
  };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = useCallback(
    () => setWindowDimensions(getWindowDimensions()),
    []
  );
  useEventListener_v2(undefined, "resize", handleResize);

  return windowDimensions;
};

import { useEffect } from "react";

export const useEventListener_v2 = (
  target: EventTarget | undefined,
  event: string,
  listener: EventListenerOrEventListenerObject,
  trigger = true
): void => {
  useEffect(() => {
    const t = target || window;
    t.addEventListener(event, listener);
    trigger && t.dispatchEvent(new Event(event));
    return () => t.removeEventListener(event, listener);
  }, [event, listener, target, trigger]);
};
