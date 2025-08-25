import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { getDaisyUIColor } from '../utility/ChartUtils';

interface LineChartProps {
  chartData: ChartData<'line'>;
  title: string;
}

const LineChart: React.FC<LineChartProps> = ({ chartData, title }) => {
  const lineOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: getDaisyUIColor('--bc'),
        },
      },
      title: {
        display: true,
        text: title,
        color: getDaisyUIColor('--bc'),
      },
    },
    scales: {
      x: {
        ticks: {
          color: getDaisyUIColor('--bc'),
        },
        grid: {
          color: getDaisyUIColor('--b3', 0.5),
        },
      },
      y: {
        ticks: {
          color: getDaisyUIColor('--bc'),
        },
        grid: {
          color: getDaisyUIColor('--b3', 0.5),
        },
      },
    },
  };

  return <Line options={lineOptions} data={chartData} />;
};

export default LineChart;
