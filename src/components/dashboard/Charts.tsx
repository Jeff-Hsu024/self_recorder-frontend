import { useState, useEffect, useCallback } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PieController,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getChartData, ChartData } from '../../services/ChartService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PieController,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

type ChartType = 'bar' | 'line' | 'pie';

interface ChartsProps {
  chartType: ChartType;
  title: string;
}

function Charts({ chartType, title }: ChartsProps) {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  const getDaisyUIColor = useCallback((cssVar: string, opacity: number = 1) => {
    if (typeof document === 'undefined') return `rgba(0,0,0,${opacity})`;
    const colorMap: { [key: string]: string } = {
      '--p': `rgba(59, 130, 246, ${opacity})`, // blue-500
      '--s': `rgba(16, 185, 129, ${opacity})`, // emerald-500
      '--a': `rgba(239, 68, 68, ${opacity})`,  // red-500
      '--n': `rgba(107, 114, 128, ${opacity})`, // gray-500
      '--nf': `rgba(243, 244, 246, ${opacity})`, // gray-100
      '--su': `rgba(34, 197, 94, ${opacity})`, // green-500
      '--wa': `rgba(251, 191, 36, ${opacity})`, // yellow-500
      '--er': `rgba(239, 68, 68, ${opacity})`, // red-500
      '--in': `rgba(96, 165, 250, ${opacity})`, // blue-400
    };
    return colorMap[cssVar] || `rgba(0,0,0,${opacity})`;
  }, []);

  const getChartColors = useCallback((count: number, opacity: number) => {
    const daisyUIColors = ['--p', '--s', '--a', '--n', '--su', '--wa', '--er', '--in'];
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(getDaisyUIColor(daisyUIColors[i % daisyUIColors.length], opacity));
    }
    return colors;
  }, [getDaisyUIColor]);

  useEffect(() => {
    const subscription = getChartData().subscribe((data) => {
      // Apply colors based on the data received from ChartService
      const newDatasets = data.datasets.map(dataset => ({
        ...dataset,
        backgroundColor: getChartColors(data.labels.length, 0.6),
        borderColor: getChartColors(data.labels.length, 1),
      }));

      setChartData({
        labels: data.labels,
        datasets: newDatasets,
      });
    });

    // Listen for theme changes (e.g., by observing the data-theme attribute on html)
    const observer = new MutationObserver(() => {
      // Re-fetch or re-calculate colors when theme changes
      getChartData().subscribe((data) => {
        const newDatasets = data.datasets.map(dataset => ({
          ...dataset,
          backgroundColor: getChartColors(data.labels.length, 0.6),
          borderColor: getChartColors(data.labels.length, 1),
        }));

        setChartData({
          labels: data.labels,
          datasets: newDatasets,
        });
      });
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      subscription.unsubscribe();
      observer.disconnect();
    };
  }, [getChartColors]);

  const options = {
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

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar options={options} data={chartData} />;
      case 'pie':
        return <Pie options={options} data={chartData} />;
      case 'line':
        return <Line options={options} data={chartData} />;
      default:
        return <Bar options={options} data={chartData} />;
    }
  };

  return (
    <div className="relative bg-base-100 rounded-lg shadow-md p-4 w-full lg:w-full mx-auto h-100">
      {renderChart()}
    </div>
  );
}

export default Charts;
