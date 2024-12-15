import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ClearIcon from '@mui/icons-material/Clear';
import { useGlobalState } from '../context/StateContext';
import { Button, Slider, Switch } from '@mui/material';

const DisplayControls: React.FC = () => {
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
    isRecording,
    updateIsTickerPaused,
    isTickerPaused,
    chartDataLength,
    setChartDataLength,
  } = useGlobalState();

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
          width="100%"
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
            xs: '100%',
            sm: '80%',
            md: '70%',
          }}
          bgcolor="background.paper"
        >
          <Button
            onClick={() => updateIsTickerPaused((prev: boolean) => !prev)}
            variant="contained"
            color={isTickerPaused ? 'secondary' : 'primary'}
            style={{ padding: '10px 30px', fontSize: '16px', flex: 1 }}
            disabled={isRecording}
            startIcon={isTickerPaused ? <PlayArrowIcon /> : <PauseIcon />}
          >
            {isTickerPaused ? 'Resume' : 'Pause'}
          </Button>

          <Button
            onClick={handleClear}
            variant="contained"
            color="warning"
            style={{ padding: '10px 30px', fontSize: '16px', flex: 1 }}
            disabled={isTickerPaused || isRecording}
            startIcon={<ClearIcon />}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default DisplayControls;
