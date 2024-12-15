import calculateEnergy from './energy-calculator-utils';
import { CapturedData } from '../types';

test('calculateEnergy correctly calculates energy', () => {
  const data: CapturedData[] = [
    { creation: new Date(0).getTime(), value: 100 },
    { creation: new Date(3600000).getTime(), value: 200 },
  ];
  const energy = calculateEnergy(data);
  expect(energy).toBeCloseTo(100, 2);
});

test('calculateEnergy returns 0 for empty data', () => {
  const data: CapturedData[] = [];
  const energy = calculateEnergy(data);
  expect(energy).toBe(0);
});

test('calculateEnergy handles single data point', () => {
  const data: CapturedData[] = [
    { creation: new Date(0).getTime(), value: 100 },
  ];
  const energy = calculateEnergy(data);
  expect(energy).toBe(0);
});
