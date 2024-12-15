import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useGlobalState } from '../context/StateContext';

const StatusBar: React.FC = () => {
  const [timeAgo, setTimeAgo] = useState<string | null>(null);
  const [lastPowerMsg, setLastPowerMsg] = useState<string | null>(null);
  const {
    isMqttConnected,
    isDataGenerated,
    isRecording,
    lastPowerValue,
    currentRecording,
  } = useGlobalState();

  const { mqttErrorMessage } = useGlobalState();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!lastPowerValue) {
        return;
      }
      const now = new Date().getTime();
      let number = now - lastPowerValue.creation;
      const secondsAgo = Math.floor(number / 1000);
      if (secondsAgo > 3) {
        setTimeAgo(`(${secondsAgo} secs ago)`);
      } else {
        setTimeAgo(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastPowerValue]);

  const [recordingMsg, setRecordingMsg] = useState<string>('');

  useEffect(() => {
    if (isRecording) {
      if (currentRecording.length < 2) {
        setRecordingMsg(
          `in progress, ${2 - currentRecording.length} more value${(2 - currentRecording.length) > 1 ? 's' : ''} needed`,
        );
      } else {
        setRecordingMsg(`in progress, ${currentRecording.length} value${currentRecording.length > 1 ? 's' : ''} captured`);
      }
    } else {
      setRecordingMsg('waiting to start');
    }
  }, [isRecording, currentRecording]);

  useEffect(() => {
    if (!lastPowerValue) {
      setLastPowerMsg('Waiting for data');
      return;
    }
    const msg = lastPowerValue.value ? lastPowerValue.value + 'W ' + (timeAgo ?? '') : 'none';
    setLastPowerMsg(msg);
  }, [timeAgo, lastPowerValue, setLastPowerMsg]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      bgcolor="background.paper"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={1}
        width="90%"
        bgcolor="background.paper"
      >
        {mqttErrorMessage && (
          <Alert severity="error" style={{ width: '100%', marginBottom: '10px' }}>
            {mqttErrorMessage}
          </Alert>
        )}
        {!mqttErrorMessage && (
          <Alert severity="success" icon={false} style={{ width: '100%' }}>
            {!isDataGenerated && (
              <div><strong>MQTT status:</strong> {isMqttConnected ? 'connected' : 'disconnected'}</div>
            )}
            <div><strong>Last power value:</strong> {lastPowerMsg} {isDataGenerated ? '[random signal]' : ''}</div>
            <div><strong>Status:</strong> {recordingMsg}</div>
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default StatusBar;
