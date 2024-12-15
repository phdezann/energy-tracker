export enum EnergyType {
  DISTANCE,
  VOLUME,
}

export interface EnergyEntry {
  label: string;
  unit: string;
  type: EnergyType;
  energy_capacity_kwh: number;
}

const energyData: EnergyEntry[] = [
  {
    label: 'Gasoline',
    unit: 'liter',
    type: EnergyType.VOLUME,
    energy_capacity_kwh: 10,
  },
  {
    label: 'Energy of moving car',
    unit: 'km',
    type: EnergyType.DISTANCE,
    energy_capacity_kwh: 0.53,
  },
];

export default energyData;
