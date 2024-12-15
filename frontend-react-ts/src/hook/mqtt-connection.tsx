import { useEffect } from 'react';
import connectMqtt from '../helper/mqtt-utils';
import { useGlobalState } from '../context/StateContext';
import { useUpdateLastPowerValueHook } from './last-power-value-updater';

export const MqttConnectionHook = (): void => {
  const {
    isMqttConnected,
    setIsMqttConnected,
    mqttConfig,
    isDataGenerated,
    setMqttErrorMessage,
    isRecording,
    minimalMqttConfigSet,
  } = useGlobalState();

  const updateLastPowerValue = useUpdateLastPowerValueHook();

  useEffect(() => {
    if (
      isDataGenerated ||
      !minimalMqttConfigSet
    ) {
      return;
    }

    const client = connectMqtt({
      server: mqttConfig.server,
      port: mqttConfig.port,
      username: mqttConfig.username,
      password: mqttConfig.password,
      topic: 'tele/tasmota_1C12B4/SENSOR',
      onMessageCallback: (topic: string, message: string) => {
        try {
          setMqttErrorMessage(null);
          const parsedMessage = JSON.parse(message);
          if (parsedMessage?.TIC?.PAPP) {
            const powerValue = parsedMessage.TIC.PAPP;
            updateLastPowerValue(powerValue);
          }
        } catch (err) {
          console.error('Error parsing message:', err);
        }
      },
      onConnectCallback: () => setIsMqttConnected(true),
      onReconnectCallback: () => {
        setIsMqttConnected(false);
        setMqttErrorMessage('Reconnecting...');
      },
      onErrorCallback: (err) => {
        setIsMqttConnected(false);
        setMqttErrorMessage(err);
        console.error('MQTT Error:', err);
        client.end();
      },
    });

    return () => {
      client.end();
    };
  }, [
    mqttConfig,
    updateLastPowerValue,
    minimalMqttConfigSet,
    isRecording,
    isDataGenerated,
    isMqttConnected,
    setIsMqttConnected,
    setMqttErrorMessage,
  ]);

  useEffect(() => {
    if (isDataGenerated) {
      setMqttErrorMessage(null);
      setIsMqttConnected(false);
    }
  }, [isDataGenerated, setMqttErrorMessage, setIsMqttConnected]);

};
