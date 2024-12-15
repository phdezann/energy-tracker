import { computeChartData, roundDown } from './chart-data-utils';
import { CapturedData, ChartData } from '../types';

test('generateDisplayedData correctly generates displayed data', () => {
  const tick: number = new Date('2023-10-01T00:00:00.060Z').getTime();
  const capturedData: CapturedData[] = [
    { creation: new Date('2023-09-30T23:59:59.210Z').getTime(), value: 100 },
    { creation: new Date('2023-09-30T23:59:59.630Z').getTime(), value: 200 },
    { creation: new Date('2023-10-01T00:00:02.400Z').getTime(), value: 300 },
  ];
  const displayedDataLength: number = 1;

  const result: ChartData[] = computeChartData(
    tick,
    capturedData,
    displayedDataLength,
    100,
  );

  const expected: ChartData[] = [
    {
      creation: new Date('2023-09-30T23:59:59.000Z').getTime(),
      value: null,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.100Z').getTime(),
      value: null,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.200Z').getTime(),
      value: null,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.300Z').getTime(),
      value: 100,
      capturedData: true,
    },
    {
      creation: new Date('2023-09-30T23:59:59.400Z').getTime(),
      value: 100,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.500Z').getTime(),
      value: 100,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.600Z').getTime(),
      value: 100,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.700Z').getTime(),
      value: 200,
      capturedData: true,
    },
    {
      creation: new Date('2023-09-30T23:59:59.800Z').getTime(),
      value: 200,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.900Z').getTime(),
      value: 200,
      capturedData: false,
    },
    {
      creation: new Date('2023-10-01T00:00:00.000Z').getTime(),
      value: 200,
      capturedData: false,
    },
  ];

  expect(result).toEqual(expected);
});

test('generateDisplayedData correctly generates displayed data222', () => {
  const tick: number = new Date('2023-10-01T00:00:00.060Z').getTime();
  const capturedData: CapturedData[] = [
    { creation: new Date('2023-09-30T23:59:58.520Z').getTime(), value: 80 },
    { creation: new Date('2023-09-30T23:59:58.820Z').getTime(), value: 90 },
    { creation: new Date('2023-09-30T23:59:59.210Z').getTime(), value: 100 },
    { creation: new Date('2023-09-30T23:59:59.630Z').getTime(), value: 200 },
    { creation: new Date('2023-10-01T00:00:02.400Z').getTime(), value: 300 },
  ];
  const displayedDataLength: number = 1;

  const result: ChartData[] = computeChartData(
    tick,
    capturedData,
    displayedDataLength,
    100,
  );

  const expected: ChartData[] = [
    {
      creation: new Date('2023-09-30T23:59:59.000Z').getTime(),
      value: 90,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.100Z').getTime(),
      value: 90,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.200Z').getTime(),
      value: 90,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.300Z').getTime(),
      value: 100,
      capturedData: true,
    },
    {
      creation: new Date('2023-09-30T23:59:59.400Z').getTime(),
      value: 100,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.500Z').getTime(),
      value: 100,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.600Z').getTime(),
      value: 100,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.700Z').getTime(),
      value: 200,
      capturedData: true,
    },
    {
      creation: new Date('2023-09-30T23:59:59.800Z').getTime(),
      value: 200,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.900Z').getTime(),
      value: 200,
      capturedData: false,
    },
    {
      creation: new Date('2023-10-01T00:00:00.000Z').getTime(),
      value: 200,
      capturedData: false,
    },
  ];

  expect(result).toEqual(expected);
});

test('generateDisplayedData handles empty capturedData', () => {
  const tick: number = new Date('2023-10-01T00:00:00.060Z').getTime();
  const capturedData: CapturedData[] = [];
  const displayedDataLength: number = 1;

  const result: ChartData[] = computeChartData(
    tick,
    capturedData,
    displayedDataLength,
    100,
  );

  expect(result).toEqual([
    {
      creation: new Date('2023-09-30T23:59:59.000Z').getTime(),
      value: null,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.100Z').getTime(),
      value: null,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.200Z').getTime(),
      value: null,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.300Z').getTime(),
      value: null,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.400Z').getTime(),
      value: null,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.500Z').getTime(),
      value: null,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.600Z').getTime(),
      value: null,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.700Z').getTime(),
      value: null,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.800Z').getTime(),
      value: null,
      capturedData: false,
    },
    {
      creation: new Date('2023-09-30T23:59:59.900Z').getTime(),
      value: null,
      capturedData: false,
    },
    {
      creation: new Date('2023-10-01T00:00:00.000Z').getTime(),
      value: null,
      capturedData: false,
    },
  ]);
});

test('roundDown rounds down to the next second', () => {
  const date: Date = new Date('2023-10-01T12:34:56.789Z');
  const roundedDate: Date = roundDown(date, 100);
  expect(roundedDate).toEqual(new Date('2023-10-01T12:34:56.700Z'));
});

test('roundDown rounds down correctly when milliseconds are zero', () => {
  const date: Date = new Date('2023-10-01T12:34:56.782Z');
  const roundedDate: Date = roundDown(date, 100);
  expect(roundedDate).toEqual(new Date('2023-10-01T12:34:56.700Z'));
});

test('roundDown rounds down correctly when milliseconds are zero2', () => {
  const date: Date = new Date('2023-10-01T12:34:56.782Z');
  const roundedDate: Date = roundDown(date, 10);
  expect(roundedDate).toEqual(new Date('2023-10-01T12:34:56.780Z'));
});
