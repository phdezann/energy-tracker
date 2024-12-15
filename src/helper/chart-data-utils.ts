import { CapturedData, ChartData, Timestamp } from '../types';

export const computeChartData = (
  tick: Timestamp,
  capturedData: CapturedData[],
  chartDataDurationInSecs: number,
  stepIntervalInMillis: number,
): ChartData[] => {

  const displayedData: ChartData[] = [];
  let lastKnownValue: CapturedData | null = null;

  const end = roundDown(
    new Date(tick),
    stepIntervalInMillis,
  ).getTime();
  const start = end - chartDataDurationInSecs * 1000;

  function push(stepEnd: number, value: number | null, capturedData: boolean) {
    displayedData.push({
      creation: new Date(stepEnd).getTime(),
      value: value,
      capturedData: capturedData,
    });
  }

  for (
    let stepStart = start - stepIntervalInMillis;
    stepStart < end;
    stepStart += stepIntervalInMillis
  ) {
    const stepEnd = stepStart + stepIntervalInMillis;
    const capturedValue = findBetween(capturedData, stepStart, stepEnd);

    if (capturedValue) {
      push(stepEnd, capturedValue.value, true);
      lastKnownValue = capturedValue;
    } else {
      if (!lastKnownValue) {
        lastKnownValue = findBefore(capturedData, stepStart) || null;
      }
      if (lastKnownValue) {
        push(stepEnd, lastKnownValue.value, false);
      } else {
        push(stepEnd, null, false);
      }
    }
  }

  return displayedData;
};

export const roundDown = (date: Date, stepInMilliSecs: number): Date => {
  const milliseconds = date.getMilliseconds();
  const number = Math.floor(milliseconds / stepInMilliSecs) * stepInMilliSecs;
  date.setMilliseconds(number);
  return date;
};

const findBefore = (
  capturedData: CapturedData[],
  start: number,
): CapturedData | undefined => {
  const filtered = capturedData.filter((data) => data.creation < start);
  if (filtered.length === 0) return undefined;
  return filtered[filtered.length - 1];
};

const findBetween = (
  capturedData: CapturedData[],
  start: number,
  end: number,
): CapturedData | undefined => {
  return capturedData.find(
    (data) => start < data.creation && data.creation <= end,
  );
};
