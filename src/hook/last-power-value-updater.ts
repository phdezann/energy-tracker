import { useCallback } from 'react';
import { useGlobalState } from '../context/StateContext';

export const useUpdateLastPowerValueHook = () => {
  const { setLastPowerValue } = useGlobalState();

  return useCallback((powerValue: number) => {
    const newValue = { value: powerValue, creation: new Date().getTime() };
    setLastPowerValue(newValue);
  }, [setLastPowerValue]);
};