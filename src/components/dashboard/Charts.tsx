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

function Charts() {
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
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'line'>('bar');
  const [selectedLabels, setSelectedLabels] = useState<Record<string, boolean>>({});

  const getDaisyUIColor = useCallback((cssVar: string, opacity: number = 1) => {
    if (typeof document === 'undefined') return `rgba(0,0,0,${opacity})`; // For SSR or testing
    // Convert HSL to RGB if necessary, or handle direct RGB/hex
    // For simplicity, assuming DaisyUI colors are already in a format Chart.js can use directly or as RGB parts
    // DaisyUI colors are typically in HSL format, e.g., "210 100% 50%"
    // We need to convert them to rgba. A simple approach is to use a fixed set of colors or parse HSL.
    // For now, let's use a fallback or assume direct RGB if available.
    // A more robust solution would involve a HSL to RGB conversion utility.
    // For demonstration, let's use a few fixed DaisyUI CSS variables and convert them to rgba.
    // DaisyUI colors are often defined as --p: 210 100% 50%; (hue saturation lightness)
    // We need to convert these to rgba.
    // A quick way to get a consistent set of colors is to define them directly or use a utility.
    // For now, let's use a simple approach by defining a few common DaisyUI colors.
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
    return colorMap[cssVar] || `rgba(0,0,0,${opacity})`; // Fallback to black
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
      const foodCategories = [...new Set(data.labels)];
      const categoryCalories = foodCategories.map((category) => {
        return data.datasets[0].data.reduce((sum, calorie, index) => {
          if (data.labels[index] === category) {
            return sum + calorie;
          }
          return sum;
        }, 0);
      });

      const backgroundColors = getChartColors(foodCategories.length, 0.6);
      const borderColors = getChartColors(foodCategories.length, 1);

      const newChartData = {
        labels: foodCategories,
        datasets: [
          {
            label: 'Calories',
            data: categoryCalories,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      };
      setChartData(newChartData);

      // Initialize selectedLabels with all labels selected
      const initialSelectedLabels: Record<string, boolean> = {};
      foodCategories.forEach((label) => {
        initialSelectedLabels[label] = true;
      });
      setSelectedLabels(initialSelectedLabels);
    });

    // Listen for theme changes (e.g., by observing the data-theme attribute on html)
    const observer = new MutationObserver(() => {
      // Re-fetch or re-calculate colors when theme changes
      getChartData().subscribe((data) => {
        const foodCategories = [...new Set(data.labels)];
        const categoryCalories = foodCategories.map((category) => {
          return data.datasets[0].data.reduce((sum, calorie, index) => {
            if (data.labels[index] === category) {
              return sum + calorie;
            }
            return sum;
          }, 0);
        });

        const backgroundColors = getChartColors(foodCategories.length, 0.6);
        const borderColors = getChartColors(foodCategories.length, 1);

        const newChartData = {
          labels: foodCategories,
          datasets: [
            {
              label: 'Calories',
              data: categoryCalories,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1,
            },
          ],
        };
        setChartData(newChartData);
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
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: getDaisyUIColor('--bc'), // Use base content color for legend labels
        },
      },
      title: {
        display: true,
        text: 'Diet Records Chart',
        color: getDaisyUIColor('--bc'), // Use base content color for title
      },
    },
    scales: {
      x: {
        ticks: {
          color: getDaisyUIColor('--bc'), // Use base content color for x-axis ticks
        },
        grid: {
          color: getDaisyUIColor('--b3', 0.5), // Use base-300 with opacity for grid lines
        },
      },
      y: {
        ticks: {
          color: getDaisyUIColor('--bc'), // Use base content color for y-axis ticks
        },
        grid: {
          color: getDaisyUIColor('--b3', 0.5), // Use base-300 with opacity for grid lines
        },
      },
    },
  };

  const renderChart = () => {
    const filteredLabels = Object.keys(selectedLabels).filter((label) => selectedLabels[label]);
    const filteredChartData = {
      labels: filteredLabels,
      datasets: [
        {
          ...chartData.datasets[0],
          data: chartData.datasets[0].data.filter((_, index) => filteredLabels.includes(chartData.labels[index])),
        },
      ],
    };

    switch (chartType) {
      case 'bar':
        return <Bar options={options} data={filteredChartData} />;
      case 'pie':
        return <Pie options={options} data={filteredChartData} />;
      case 'line':
        return <Line options={options} data={filteredChartData} />;
      default:
        return <Bar options={options} data={filteredChartData} />;
    }
  };

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-4 w-full">
      <div className="flex justify-around mb-4">
        <button className="btn btn-sm" onClick={() => setChartType('bar')}>Bar</button>
        <button className="btn btn-sm" onClick={() => setChartType('pie')}>Pie</button>
        <button className="btn btn-sm" onClick={() => setChartType('line')}>Line</button>
      </div>
      {renderChart()}
    </div>
  );
}

export default Charts;
