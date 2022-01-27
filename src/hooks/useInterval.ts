import { useRef } from "react";
import { setInterval } from "timers";

function useInterval(time: number) {
  const interval: any = useRef(null);

  const set = (method: () => void) => {
    clear();
    interval.current = setInterval(() => {
      method();
    }, time);
  };

  const clear = () => {
    clearInterval(interval.current);
  };
  return { set, clear };
}

export default useInterval;
