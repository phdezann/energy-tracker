import React, { useState } from 'react';
import MqttConfigForm from './component/MqttConfigForm';
import PowerChart from './component/PowerChart';
import Controls from './component/Controls';
import { MqttConnectionHook } from './hook/mqtt-connection';
import { DataGeneratorHook } from './hook/data-generator';
import RecordingsTable from './component/RecordingsTable';
import { Box, Tab, Tabs } from '@mui/material';
import ShowChart from '@mui/icons-material/ShowChart';
import TabPanel from './component/TabPanel';
import TableChartIcon from '@mui/icons-material/TableChart';
import TickerHook from './hook/ticker';
import SettingsIcon from '@mui/icons-material/Settings';
import StatusBar from './component/StatusBar';
import { DataRecorderHook } from './hook/data-recorder';
import { MqttConfigHook } from './hook/mqtt-config';

function App() {
  DataGeneratorHook();
  MqttConnectionHook();
  MqttConfigHook();
  TickerHook();
  DataRecorderHook();

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box
      sx={{
        width: {
          xs: '100%', // 100% width on extra-small screens
          sm: '80%', // 80% width on small screens
          md: '60%', // 60% width on medium screens and up
        },
        bgcolor: 'background.paper',
        margin: '0 auto',
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        aria-label="icon tabs example"
      >
        <Tab icon={<ShowChart />} aria-label="show chart"></Tab>
        <Tab icon={<TableChartIcon />} aria-label="table chart" />
        <Tab icon={<SettingsIcon />} aria-label="settings" />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        <PowerChart />
        <StatusBar />
        <Controls />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <RecordingsTable />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <MqttConfigForm />
      </TabPanel>
    </Box>
  );
}

export default App;