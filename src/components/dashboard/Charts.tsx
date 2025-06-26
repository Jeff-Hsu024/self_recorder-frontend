import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
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

      const backgroundColors = foodCategories.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`);
      const borderColors = foodCategories.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`);

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
  }, []);

  const handleLabelChange = (label: string) => {
    setSelectedLabels((prevSelectedLabels) => ({
      ...prevSelectedLabels,
      [label]: !prevSelectedLabels[label],
    }));
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Diet Records Chart',
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
    <div className="bg-white rounded-lg shadow-md p-4 w-full">
      <h3 className="text-lg font-bold mb-2">Charts</h3>
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
