import { CapturedData } from '../types';

const calculateEnergy = (data: CapturedData[]): number => {
  let energy = 0;
  for (let i = 1; i < data.length; i++) {
    const deltaTimeMs = data[i].creation - data[i - 1].creation;
    const deltaTimeHrs = deltaTimeMs / (1000 * 3600);
    energy += data[i - 1].value * deltaTimeHrs;
  }
  return energy;
};

export default calculateEnergy;
