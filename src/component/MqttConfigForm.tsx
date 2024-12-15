import React from 'react';
import { Box, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useGlobalState } from '../context/StateContext';

const MqttConfigForm: React.FC = () => {
  const { mqttConfig, updateMqttConfig } = useGlobalState();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updateMqttConfig((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      bgcolor="background.paper"
    >
      <Box
        display="flex"
        flexDirection="column"
        width={{
          xs: '80%', // 80% width on extra-small screens
          sm: '60%', // 60% width on small screens
          md: '50%', // 40% width on medium screens and up
        }}
        justifyContent="center"
        alignItems="center"
        gap={1}
        bgcolor="background.paper"
      >
        <Typography variant="h6" color="textSecondary">
          Configuration MQTT
        </Typography>
        <form>
          <TextField
            fullWidth
            margin="normal"
            label="Serveur"
            name="server"
            value={mqttConfig.server}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Port"
            name="port"
            value={mqttConfig.port}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Nom d'utilisateur"
            name="username"
            value={mqttConfig.username}
            onChange={handleInputChange}
            autoComplete="username"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Mot de passe"
            type="password"
            name="password"
            autoComplete="current-password"
            value={mqttConfig.password}
            onChange={handleInputChange}
          />
        </form>
      </Box>
    </Box>
  );
};

export default MqttConfigForm;
