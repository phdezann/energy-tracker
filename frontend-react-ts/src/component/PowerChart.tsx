import React, { useEffect, useRef, useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { computeChartData } from '../helper/chart-data-utils';
import { ChartData } from '../types';
import { useGlobalState } from '../context/StateContext';
import { formatTime } from '../helper/date-utils';

const chartYAxisValueMargin = 10;
const chartYAxisValueFactor = 3;

const PowerChart: React.FC = () => {
  const [yDomain, setYDomain] = useState<[string | number, string | number]>(['auto', 'auto']);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const {
    capturedData,
    tick,
    setMinYAxis,
    setMaxYAxis,
    currentYAxisValue,
    refreshRate,
    chartDataLength,
  } = useGlobalState();

  // We need to keep a reference to the capturedData to avoid re-rendering the chart if capturedData changes
  const capturedDataRef = useRef(capturedData);
  useEffect(() => {
    capturedDataRef.current = capturedData;
  }, [capturedData]);

  useEffect(() => {
    const chartData = computeChartData(
      tick,
      capturedDataRef.current,
      chartDataLength,
      refreshRate,
    );
    setChartData(chartData);
  }, [chartDataLength, tick, refreshRate]);

  useEffect(() => {
    const values = chartData
      .map((data) => data.value)
      .filter((value) => value !== null) as number[];
    const max = Math.max(...values);


    if (currentYAxisValue + chartYAxisValueMargin <= max) {
      setYDomain([0, max + chartYAxisValueMargin]);
    } else {
      setYDomain([0, currentYAxisValue]);
    }

    setMinYAxis(max);
    setMaxYAxis(max * chartYAxisValueFactor);
  }, [chartData, setMinYAxis, setMaxYAxis, currentYAxisValue]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="creation"
          tickFormatter={formatTime}
          tick={false} // Hide the X-axis values
          textAnchor="end"
        />
        <YAxis domain={yDomain} tickFormatter={(value) => `${value} W`} />
        <Tooltip
          labelFormatter={formatTime}
          formatter={(value) => `${value} W`}
        />
        <Line
          type="linear"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 10 }}
          dot={(data) => (
            <circle
              key={data.index}
              cx={data.cx}
              cy={data.cy}
              r={5}
              fill={data.payload.capturedData ? 'green' : 'none'}
            />
          )}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PowerChart;
