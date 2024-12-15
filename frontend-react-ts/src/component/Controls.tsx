import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ClearIcon from '@mui/icons-material/Clear';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import StopIcon from '@mui/icons-material/Stop';
import { useGlobalState } from '../context/StateContext';
import { Button, Slider, Switch, TextField } from '@mui/material';

const Controls: React.FC = () => {
  const {
    setCapturedData,
    isDataGenerated,
    minimalMqttConfigSet,
    minYAxis,
    maxYAxis,
    currentYAxisValue,
    setCurrentYAxisValue,
    updateIsDataGenerated,
    setLastPowerValue,
    updateIsRecording,
    isRecording,
    currentRecording,
    updateIsTickerPaused,
    isTickerPaused,
    chartDataLength,
    setChartDataLength,
    setCurrentRecordingLabel,
    setIsLabelModalOpen,
    isLabelModalOpen,
  } = useGlobalState();

  const [recordingLabelFieldValue, setRecordingLabelFieldValue] = useState('');

  const toggleRecording = () => {
    updateIsRecording((prev) => !prev);
  };

  const onModalSave = () => {
    setIsLabelModalOpen(false);
    setCurrentRecordingLabel(recordingLabelFieldValue);
  };

  const onModalClose = () => {
    setIsLabelModalOpen(false);
  };

  const handleClear = () => {
    setCapturedData([]);
    setLastPowerValue(null);
  };

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        p={2}
        bgcolor="background.paper"
      >
        <Box
          display="grid"
          gridTemplateColumns="120px 1fr"
          gridTemplateRows="1fr 1fr"
          gap={1}
          alignItems="center"
          width={{
            xs: '80%', // 80% width on extra-small screens
            sm: '60%', // 60% width on small screens
            md: '50%', // 40% width on medium screens and up
          }}
          bgcolor="background.paper"
        >
          <Typography variant="body1">X-axis zoom</Typography>
          <Slider
            min={10}
            max={100}
            value={chartDataLength}
            onChange={(e, newValue) => setChartDataLength(newValue as number)}
            valueLabelDisplay="off"
          />
          <Typography variant="body1">Y-axis zoom</Typography>
          <Slider
            min={minYAxis}
            max={maxYAxis}
            value={currentYAxisValue}
            onChange={(e, newValue) => setCurrentYAxisValue(newValue as number)}
            valueLabelDisplay="off"
          />
          {minimalMqttConfigSet &&
            <>
              <Typography variant="body1">Generated data</Typography>
              <Box display="flex" justifyContent="center" flexDirection={'column'}>
                <Switch
                  checked={isDataGenerated}
                  onChange={() =>
                    updateIsDataGenerated((prev: boolean) => !prev)
                  }
                  color="primary"
                />
              </Box>
            </>
          }
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="background.paper"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
          width={{
            xs: '100%', // 80% width on extra-small screens
            sm: '80%', // 60% width on small screens
            md: '70%', // 40% width on medium screens and up
          }}
          bgcolor="background.paper"
        >
          <Button
            onClick={toggleRecording}
            variant="contained"
            color={isRecording ? 'error' : 'success'}
            style={{ padding: '10px 30px', fontSize: '16px', flex: 1 }}
            disabled={isRecording ? currentRecording.length < 2 : false}
            startIcon={isRecording ? <StopIcon /> : <FiberManualRecordIcon />}
          >
            {isRecording ? 'Stop' : 'Record'}
          </Button>
          <Button
            onClick={() => updateIsTickerPaused((prev: boolean) => !prev)}
            variant="contained"
            color={isTickerPaused ? 'secondary' : 'primary'}
            style={{ padding: '10px 30px', fontSize: '16px', flex: 1 }}
            startIcon={isTickerPaused ? <PlayArrowIcon /> : <PauseIcon />}
          >
            {isTickerPaused ? 'Resume' : 'Pause'}
          </Button>

          <Button
            onClick={handleClear}
            variant="contained"
            color="warning"
            style={{ padding: '10px 30px', fontSize: '16px', flex: 1 }}
            startIcon={<ClearIcon />}
          >
            Clear
          </Button>
        </Box>
        <Modal open={isLabelModalOpen} onClose={onModalClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2>Enter Recording Label</h2>
            <TextField
              fullWidth
              label="Label"
              value={recordingLabelFieldValue}
              onChange={(e) => setRecordingLabelFieldValue(e.target.value)}
            />
            <Button
              onClick={onModalSave}
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Save
            </Button>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default Controls;
