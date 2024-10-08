import { useEffect, useRef, useCallback } from "react";

/**
 * Creates a `Ref` whose value is updated in an effect, ensuring the most recent
 * value is the one rendered with. Generally only required for Concurrent mode usage
 * where previous work in `render()` may be discarded before being used.
 *
 * This is safe to access in an event handler.
 *
 * @param value The `Ref` value
 */
function useCommittedRef<TValue>(
  value: TValue
): React.MutableRefObject<TValue> {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}

export default function useEventCallback<
  TCallback extends (...args: any[]) => any
>(fn?: TCallback | null): TCallback {
  const ref = useCommittedRef(fn);
  return useCallback(
    function (...args: any[]) {
      return ref.current && ref.current(...args);
    },
    [ref]
  ) as any;
}
