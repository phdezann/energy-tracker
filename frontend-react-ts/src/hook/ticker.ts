import { useCallback, useEffect } from 'react';
import { useGlobalState } from '../context/StateContext';

const TickerHook = () => {
  const { setTick, isTickerPaused, refreshRate } = useGlobalState();

  const tickCallback = useCallback(() => {
    if (isTickerPaused) {
      return;
    }
    setTick(new Date().getTime());
  }, [isTickerPaused, setTick]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      tickCallback();
    }, refreshRate);

    return () => clearInterval(intervalId);
  }, [tickCallback, refreshRate]);
};

export default TickerHook;
