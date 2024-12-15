import { useEffect, useState } from 'react';
import { useGlobalState } from '../context/StateContext';

const localStorageKey = 'mqttConfig';

export function MqttConfigHook() {
  const { mqttConfig, setMqttConfig, setIsDataGenerated, setMinimalMqttConfigSet } = useGlobalState();
  const [isMqttConfigLoaded, setIsMqttConfigLoaded] = useState<boolean>(false);

  useEffect(() => {
    const savedValue = localStorage.getItem(localStorageKey);
    if (savedValue) {
      const mqttConfig = JSON.parse(savedValue);
      setMqttConfig(mqttConfig);
    }
    setIsMqttConfigLoaded(true);
  }, [setMqttConfig]);

  useEffect(() => {
    if (isMqttConfigLoaded) {
      localStorage.setItem(localStorageKey, JSON.stringify(mqttConfig));
      const minimalMqttConfigSet = mqttConfig.server !== '' && mqttConfig.port !== '';
      setMinimalMqttConfigSet(minimalMqttConfigSet);
      setIsDataGenerated(!minimalMqttConfigSet);
    }
  }, [isMqttConfigLoaded, mqttConfig, setIsDataGenerated, setMinimalMqttConfigSet]);

  return { mqttConfig, setMqttConfig };
}
