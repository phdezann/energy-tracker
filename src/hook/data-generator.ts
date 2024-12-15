import { useEffect } from 'react';
import { useGlobalState } from '../context/StateContext';
import { randomPowerValueGenerator } from '../helper/power-value-utils';
import { useUpdateLastPowerValueHook } from './last-power-value-updater';

const minIntervalInMillis = 1000;
const maxIntervalInMillis = 3000;

const valueMin = 1000;
const valueMax = 3000;
const valueVariation = 0.01;
const valueGroupMin = 6;
const valueGroupMax = 5;

export function DataGeneratorHook() {
  const { lastPowerValue, isDataGenerated, updateCapturedData } =
    useGlobalState();

  const updateLastPowerValue = useUpdateLastPowerValueHook();

  useEffect(() => {
    if (lastPowerValue) {
      updateCapturedData((prevData) => [...prevData, lastPowerValue]);
    }
  }, [lastPowerValue, updateCapturedData]);


  useEffect(() => {
    if (isDataGenerated) {
      let timeoutId: NodeJS.Timeout;
      const generate = randomPowerValueGenerator(valueMin, valueMax, valueVariation, valueGroupMin, valueGroupMax);
      const updatePowerValue = () => {
        const randomPowerValue = generate();
        updateLastPowerValue(randomPowerValue);
        const nextInterval = Math.floor(minIntervalInMillis + Math.random() * (maxIntervalInMillis - minIntervalInMillis));
        timeoutId = setTimeout(updatePowerValue, nextInterval);
      };
      updatePowerValue();
      return () => clearTimeout(timeoutId);
    }
  }, [isDataGenerated, updateLastPowerValue]);

}
