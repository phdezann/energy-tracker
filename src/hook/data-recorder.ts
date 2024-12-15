import { useEffect, useRef, useState } from 'react';
import { CapturedData, Recording } from '../types';
import calculateEnergy from '../helper/energy-calculator-utils';
import { useGlobalState } from '../context/StateContext';

const localStorageKey = 'recordings';

export function DataRecorderHook() {
  const {
    capturedData,
    setRecordings,
    updateRecordings,
    recordings,
    currentRecording,
    setCurrentRecording,
    setLastRecording,
    isRecording,
    setIsLabelModalOpen,
    currentRecordingLabel,
    setCurrentRecordingLabel,
    setIsSnackbarOpen,
  } = useGlobalState();
  const [startRecordingDate, setStartRecordingDate] = useState<Date | null>(null);
  const [isRecordingLoaded, setIsRecordingLoaded] = useState<boolean>(false);

  const filterCapturedData = (
    capturedData: CapturedData[],
    fromDate: Date,
  ) => {
    return capturedData.filter(
      (data) => new Date(data.creation) >= fromDate,
    );
  };

  const prevIsRecordingRef = useRef(isRecording);

  useEffect(() => {
    const startRecording = () => {
      setStartRecordingDate(new Date());
    };
    const stopRecording = () => {
      setIsLabelModalOpen(true);
    };
    if (prevIsRecordingRef.current && !isRecording) {
      stopRecording();
    } else if (!prevIsRecordingRef.current && isRecording) {
      startRecording();
    }
    prevIsRecordingRef.current = isRecording;
  }, [isRecording, currentRecording, setIsLabelModalOpen]);


  useEffect(() => {
    if (currentRecordingLabel) {
      const energy = calculateEnergy(currentRecording);
      const recording: Recording = {
        recordedData: currentRecording,
        label: currentRecordingLabel || '(none)',
        energy: energy,
      };
      setLastRecording(currentRecording);
      setStartRecordingDate(null);
      setCurrentRecording([]);
      updateRecordings((prev) => [...prev, recording]);
      setCurrentRecordingLabel(null);
      setIsSnackbarOpen(true);
    }
  }, [currentRecordingLabel, currentRecording, setCurrentRecording, updateRecordings, setLastRecording, setCurrentRecordingLabel, setIsSnackbarOpen]);

  useEffect(() => {
    const savedRecordings = localStorage.getItem(localStorageKey);
    if (savedRecordings) {
      setRecordings(JSON.parse(savedRecordings));
    }
    setIsRecordingLoaded(true);
  }, [setRecordings, setIsRecordingLoaded]);

  useEffect(() => {
    if (isRecordingLoaded) {
      localStorage.setItem(localStorageKey, JSON.stringify(recordings));
    }
  }, [isRecordingLoaded, recordings]);

  useEffect(() => {
    if (isRecording && startRecordingDate) {
      const recoding = filterCapturedData(
        capturedData,
        startRecordingDate,
      );
      setCurrentRecording(recoding);
    }
  }, [capturedData, isRecording, startRecordingDate, setCurrentRecording]);
}
