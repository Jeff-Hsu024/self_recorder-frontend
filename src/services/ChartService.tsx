import { BehaviorSubject } from 'rxjs';
import { UserFoodLog } from './DietService'; // Assuming UserFoodLog is needed for diet-specific grouping

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

const initialChartData: ChartData = {
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
};

const chartDataSubject = new BehaviorSubject<ChartData>(initialChartData);

const setChartData = (data: ChartData) => {
  chartDataSubject.next(data);
};

const getChartData = () => {
  return chartDataSubject.asObservable();
};

// Generic function to group data by a date property (e.g., eatTime)
function groupDataByDay<T extends { [key: string]: any }>(
  data: T[],
  dateProp: keyof T,
  valueProp: keyof T
): ChartData {
  const groupedData: { [key: string]: number } = {};

  data.forEach((item) => {
    const date = new Date(item[dateProp]);
    const day = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const value = parseFloat(item[valueProp]);

    if (!isNaN(value)) {
      groupedData[day] = (groupedData[day] || 0) + value;
    }
  });

  const labels = Object.keys(groupedData).sort();
  const values = labels.map((label) => groupedData[label]);

  return {
    labels: labels,
    datasets: [
      {
        label: 'Daily Total',
        data: values,
        backgroundColor: labels.map(() => 'rgba(75, 192, 192, 0.6)'), // Example color
        borderColor: labels.map(() => 'rgba(75, 192, 192, 1)'), // Example color
        borderWidth: 1,
      },
    ],
  };
}

// Function to group diet data for pie charts
function groupDietDataForPieChart(
  data: UserFoodLog[],
  priority: ('foodCategory' | 'foodName')[] = ['foodCategory', 'foodName']
): ChartData {
  const groupedData: { [key: string]: number } = {};
  const categories = new Set(data.map(item => item.foodCategory));

  let primaryGroupingProp: 'foodCategory' | 'foodName' = 'foodCategory';

  // Determine primary grouping based on priority and data characteristics
  if (priority.includes('foodCategory') && categories.size > 1) {
    primaryGroupingProp = 'foodCategory';
  } else if (priority.includes('foodName')) {
    primaryGroupingProp = 'foodName';
  }

  data.forEach((item) => {
    const key = item[primaryGroupingProp];
    const value = parseFloat(item.calories.toString()); // Assuming calories for value

    if (!isNaN(value)) {
      groupedData[key] = (groupedData[key] || 0) + value;
    }
  });

  const labels = Object.keys(groupedData).sort();
  const values = labels.map((label) => groupedData[label]);

  // Generate dynamic colors for pie chart
  const backgroundColors = labels.map((_, index) => `hsl(${(index * 30) % 360}, 70%, 60%)`);
  const borderColors = labels.map((_, index) => `hsl(${(index * 30) % 360}, 70%, 40%)`);

  return {
    labels: labels,
    datasets: [
      {
        label: 'Calories by Category/Food',
        data: values,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };
}

export { setChartData, getChartData, groupDataByDay, groupDietDataForPieChart };
export type { ChartData };
