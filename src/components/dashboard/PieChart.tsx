import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { getDaisyUIColor } from '../utility/ChartUtils';

interface PieChartProps {
  chartData: ChartData<'pie'>;
  title: string;
}

const PieChart: React.FC<PieChartProps> = ({ chartData, title }) => {
  const pieOptions: ChartOptions<'pie'> = {
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
  };

  return <Pie options={pieOptions} data={chartData} />;
};

export default PieChart;
