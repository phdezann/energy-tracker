import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import StopIcon from '@mui/icons-material/Stop';
import { useGlobalState } from '../context/StateContext';
import { Button, IconButton, Snackbar, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const RecordingControls: React.FC = () => {
  const {
    updateIsRecording,
    isRecording,
    currentRecording,
    lastRecording,
    setCurrentRecordingLabel,
    setIsLabelModalOpen,
    isLabelModalOpen,
    isTickerPaused,
    setIsSnackbarOpen,
    isSnackbarOpen,
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

  const snackbarHandleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const snackbarAction = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={snackbarHandleClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <div>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={snackbarHandleClose}
        message={`Recording with ${lastRecording?.length} values saved`}
        action={snackbarAction}
      />
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
          width="50%"
          m={1}
          bgcolor="background.paper"
        >
          <Button
            onClick={toggleRecording}
            variant="contained"
            color={isRecording ? 'error' : 'success'}
            style={{ padding: '10px 30px', fontSize: '16px', flex: 1 }}
            disabled={isRecording ? currentRecording.length < 2 : isTickerPaused}
            startIcon={isRecording ? <StopIcon /> : <FiberManualRecordIcon />}
          >
            {isRecording ? 'Stop' : 'Record'}
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
            <TextField
              fullWidth
              label="Recording label"
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
            <Button
              onClick={onModalClose}
              variant="outlined"
              color="secondary"
              sx={{ mt: 2, ml: 2 }}
            >
              Cancel
            </Button>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default RecordingControls;
