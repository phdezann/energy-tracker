import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { EnergyApiData, Recording } from '../types';
import { useGlobalState } from '../context/StateContext';
import { formatDateTime } from '../helper/date-utils';

const RecordingsTable: React.FC = () => {
  const { recordings, updateRecordings } = useGlobalState();
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [energyApiDataLoading, setEnergyApiDataLoading] = useState(false);
  const [energyApiData, setEnergyEnergyApiData] = useState<EnergyApiData | null>(null);
  const [energyApiRequestDuration, setEnergyApiRequestDuration] = useState<number>(0);
  const [recordingLabelFieldValue, setRecordingLabelFieldValue] = useState('');
  const [mwhFieldValue, setMwhField] = useState<string>('');

  const handleEditActionClick = (index: number, recording: Recording) => {
    setSelectedRecording(recording);
    setRecordingLabelFieldValue(recordings[index].label);
  };

  const handleEditModalSaveClick = () => {
    if (selectedRecording) {
      updateRecordings((prev) =>
        prev.map((recording) =>
          recording === selectedRecording ? { ...recording, label: recordingLabelFieldValue } : recording,
        ));
      setSelectedRecording(null);
    }
  };

  const handleInfoActionClick = (recording: Recording) => {
    setMwhField(recording.energy.toFixed(2));
    setIsInfoModalOpen(true);
  };

  const handleDeleteActionClick = (recording: Recording) => {
    updateRecordings((prev) =>
      prev.filter((rec) => rec !== recording),
    );
  };

  const handleEditModalCloseClick = () => {
    setSelectedRecording(null);
  };

  const handleDataModalClose = () => {
    setIsInfoModalOpen(false);
    setEnergyEnergyApiData(null);
    setMwhField('');
  };

  const handleEnergyApiCall = async () => {
    setEnergyApiDataLoading(true);
    const startTime = performance.now();
    try {
      const response = await fetch(`/energy?mwh=${mwhFieldValue}`);
      const data = await response.json();
      const endTime = performance.now();
      setEnergyApiRequestDuration(endTime - startTime);
      setEnergyEnergyApiData({
        energy_matches: data.energy_matches,
        power_matches: data.power_matches,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setEnergyEnergyApiData(null);
    } finally {
      setEnergyApiDataLoading(false);
    }
  };

  const calculateRecordingDuration = (recording: Recording): string => {
    const start = new Date(recording.recordedData[0].creation).getTime();
    const end = new Date(recording.recordedData[recording.recordedData.length - 1].creation).getTime();
    return ((end - start) / 1000).toFixed(2);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Label</TableCell>
              <TableCell>Start time</TableCell>
              <TableCell>Energy (mWh)</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recordings.map((recording, index) => (
              <TableRow key={index}>
                <TableCell>{recording.label}</TableCell>
                <TableCell>
                  {formatDateTime(recording.recordedData[0].creation)}
                </TableCell>
                <TableCell>
                  {recording.energy.toFixed(2)}
                </TableCell>
                <TableCell>
                  {calculateRecordingDuration(recording)}{' '}seconds
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditActionClick(index, recording)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleInfoActionClick(recording)}>
                    <InfoIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteActionClick(recording)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={selectedRecording !== null} onClose={handleEditModalCloseClick}>
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
          {selectedRecording !== null && (
            <>
              <h2>Edit Recording</h2>
              <p>Energy: {selectedRecording.energy.toFixed(2)} mWh</p>
              <p>Duration: {calculateRecordingDuration(selectedRecording)} seconds</p>
              <p>Start time: {formatDateTime(selectedRecording.recordedData[0].creation)}</p>
              <TextField
                fullWidth
                label="Label"
                value={recordingLabelFieldValue}
                onChange={(e) => setRecordingLabelFieldValue(e.target.value)}
              />
              <Button
                onClick={handleEditModalSaveClick}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Save
              </Button>
              <Button
                onClick={handleEditModalCloseClick}
                variant="outlined"
                color="secondary"
                sx={{ mt: 2, ml: 2 }}
              >
                Cancel
              </Button>
            </>
          )}
        </Box>
      </Modal>
      <Modal open={isInfoModalOpen} onClose={handleDataModalClose}>
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
          <h2>Energy equivalency</h2>
          <TextField
            fullWidth
            label="Energy (mWh)"
            value={mwhFieldValue}
            onChange={(e) => setMwhField(e.target.value)}
          />
          <Button
            onClick={handleEnergyApiCall}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={energyApiDataLoading}
          >
            {energyApiDataLoading ? 'Fetching Data' : 'Fetch Data'}
          </Button>
          {energyApiData && (
            <>
              <p>Request duration: {energyApiRequestDuration.toFixed(2)} ms</p>
              <h3>Equivalent amount of energy</h3>
              <ul>
                {energyApiData.energy_matches.map((item, index) => (
                  <li key={index}>{item.label}: {item.value}</li>
                ))}
              </ul>
              <h3>Equivalent energy consumption</h3>
              <ul>
                {energyApiData.power_matches.map((item, index) => (
                  <li key={index}>{item.label}: {item.duration}</li>
                ))}
              </ul>
            </>
          )}
          {!energyApiData && (
            <p>No data available</p>
          )}
          <Button
            onClick={handleDataModalClose}
            variant="outlined"
            color="secondary"
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default RecordingsTable;