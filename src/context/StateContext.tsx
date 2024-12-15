import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { CapturedData, MQTTConfig, Recording, Timestamp } from '../types';

interface GlobalStateContextProps {
  lastPowerValue: CapturedData | null;
  setLastPowerValue: (value: CapturedData | null) => void;
  capturedData: CapturedData[];
  setCapturedData: (value: CapturedData[]) => void;
  updateCapturedData: (updater: (prev: CapturedData[]) => CapturedData[]) => void;
  recordings: Recording[];
  setRecordings: (value: Recording[]) => void;
  updateRecordings: (updater: (prev: Recording[]) => Recording[]) => void;
  mqttConfig: MQTTConfig;
  setMqttConfig: (value: MQTTConfig) => void;
  minimalMqttConfigSet: boolean;
  setMinimalMqttConfigSet: (value: boolean) => void;
  updateMqttConfig: (updater: (prev: MQTTConfig) => MQTTConfig) => void;
  mqttErrorMessage: string | null;
  setMqttErrorMessage: (value: string | null) => void;
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  updateIsRecording: (updater: (prev: boolean) => boolean) => void;
  tick: Timestamp;
  setTick: (value: Timestamp) => void;
  isTickerPaused: boolean;
  setIsTickerPaused: (value: boolean) => void;
  updateIsTickerPaused: (updater: (prev: boolean) => boolean) => void;
  chartDataLength: number;
  setChartDataLength: (value: number) => void;
  currentRecording: CapturedData[];
  setCurrentRecording: (value: CapturedData[]) => void;
  lastRecording: CapturedData[] | null;
  setLastRecording: (value: CapturedData[] | null) => void;
  isDataGenerated: boolean;
  setIsDataGenerated: (value: boolean) => void;
  updateIsDataGenerated: (updater: (prev: boolean) => boolean) => void;
  isMqttConnected: boolean;
  setIsMqttConnected: (value: boolean) => void;
  refreshRate: number;
  setRefreshRate: (value: number) => void;
  minYAxis: number;
  setMinYAxis: (value: number) => void;
  maxYAxis: number;
  setMaxYAxis: (value: number) => void;
  currentRecordingLabel: string | null;
  setCurrentRecordingLabel: (value: string | null) => void;
  currentYAxisValue: number;
  setCurrentYAxisValue: (value: number) => void;
  isLabelModalOpen: boolean;
  setIsLabelModalOpen: (value: boolean) => void;
  isSnackbarOpen: boolean;
  setIsSnackbarOpen: (value: boolean) => void;
}

const StateContext = createContext<GlobalStateContextProps | undefined>(
  undefined,
);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [lastPowerValue, setLastPowerValue] = useState<CapturedData | null>(null);
  const [capturedData, setCapturedData] = useState<CapturedData[]>([]);
  const [isDataGenerated, setIsDataGenerated] = useState<boolean>(true);
  const [mqttConfig, setMqttConfig] = useState<MQTTConfig>(createMqttConfig());
  const [minimalMqttConfigSet, setMinimalMqttConfigSet] = useState<boolean>(false);
  const [isMqttConnected, setIsMqttConnected] = useState<boolean>(false);
  const [chartDataLength, setChartDataLength] = useState<number>(50);
  const [currentRecording, setCurrentRecording] = useState<CapturedData[]>([]);
  const [lastRecording, setLastRecording] = useState<CapturedData[] | null>([]);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [tick, setTick] = useState<Timestamp>(new Date().getTime());
  const [isTickerPaused, setIsTickerPaused] = useState<boolean>(false);
  const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const [mqttErrorMessage, setMqttErrorMessage] = useState<string | null>(null);
  const [currentRecordingLabel, setCurrentRecordingLabel] = useState<string | null>(null);

  const [refreshRate, setRefreshRate] = useState<number>(100);
  const [minYAxis, setMinYAxis] = useState<number>(1000);
  const [maxYAxis, setMaxYAxis] = useState<number>(5000);
  const [currentYAxisValue, setCurrentYAxisValue] = useState<number>(100);

  const createUpdater = <T, >(setter: React.Dispatch<React.SetStateAction<T>>) =>
    (updater: (prev: T) => T) => setter(updater);

  /* eslint-disable react-hooks/exhaustive-deps */
  const updateCapturedData = useCallback(createUpdater(setCapturedData), [setCapturedData]);
  const updateRecordings = useCallback(createUpdater(setRecordings), [setRecordings]);
  const updateMqttConfig = useCallback(createUpdater(setMqttConfig), [setMqttConfig]);
  const updateIsRecording = useCallback(createUpdater(setIsRecording), [setIsRecording]);
  const updateIsDataGenerated = useCallback(createUpdater(setIsDataGenerated), [setIsDataGenerated]);
  const updateIsTickerPaused = useCallback(createUpdater(setIsTickerPaused), [setIsTickerPaused]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <StateContext.Provider
      value={{
        lastPowerValue,
        setLastPowerValue,
        capturedData,
        setCapturedData,
        updateCapturedData,
        recordings,
        setRecordings,
        updateRecordings,
        mqttConfig,
        setMqttConfig,
        updateMqttConfig,
        mqttErrorMessage,
        setMqttErrorMessage,
        isRecording,
        setIsRecording,
        updateIsRecording,
        minimalMqttConfigSet,
        setMinimalMqttConfigSet,
        tick,
        setTick,
        isTickerPaused,
        setIsTickerPaused,
        updateIsTickerPaused,
        chartDataLength,
        setChartDataLength,
        currentRecording,
        setCurrentRecording,
        lastRecording,
        setLastRecording,
        isDataGenerated,
        setIsDataGenerated,
        updateIsDataGenerated,
        isMqttConnected,
        setIsMqttConnected,
        refreshRate,
        setRefreshRate,
        minYAxis,
        setMinYAxis,
        maxYAxis,
        setMaxYAxis,
        currentYAxisValue,
        setCurrentYAxisValue,
        currentRecordingLabel,
        setCurrentRecordingLabel,
        setIsLabelModalOpen,
        isLabelModalOpen,
        isSnackbarOpen,
        setIsSnackbarOpen,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useGlobalState = (): GlobalStateContextProps => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

function createMqttConfig() {
  return {
    server: '',
    port: '',
    username: '',
    password: '',
  };
}
