import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartDataset, ChartOptions } from 'chart.js';
import { getDaisyUIColor } from '../utility/ChartUtils';

interface BarChartProps {
  labels: string[];
  datasets: ChartDataset<'bar'>[];
  title: string;
}

const BarChart: React.FC<BarChartProps> = ({ labels, datasets, title }) => {
  const barOptions: ChartOptions<'bar'> = {
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
        stacked: true,
        ticks: {
          color: getDaisyUIColor('--bc'),
        },
        grid: {
          color: getDaisyUIColor('--b3', 0.5),
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: getDaisyUIColor('--bc'),
        },
        grid: {
          color: getDaisyUIColor('--b3', 0.5),
        },
      },
    },
  };

  const chartData = {
    labels,
    datasets,
  };

  return <Bar options={barOptions} data={chartData} />;
};

export default BarChart;
