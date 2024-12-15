export type Timestamp = number;

export interface CapturedData {
  creation: number;
  value: number;
}

export interface ChartData {
  creation: Timestamp;
  value: number | null;
  capturedData: boolean;
}

export interface MQTTConfig {
  server: string;
  port: string;
  username: string;
  password: string;
}

export interface Recording {
  recordedData: CapturedData[];
  energy: number;
  label: string;
}

export interface EnergyApiData {
  energy_matches: { label: string; value: number }[];
  power_matches: { label: string; duration: number }[];
}
