import { getDaisyUIColor } from './ChartUtils';
import { ChartOptions } from 'chart.js';

export const getCommonChartOptions = (title: string): ChartOptions => ({
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
});
