import { UserFoodLog } from './DietService'; // Assuming UserFoodLog is needed for diet-specific grouping
import { ChartDataset } from 'chart.js';
import { getChartColors } from '../components/utility/ChartUtils';

interface ChartDataResult {
  labels: string[];
  datasets: ChartDataset<'bar'>[];
}

// Helper to check if two dates are on the same day
const isSameDay = (d1: Date, d2: Date) => {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};

// Function to group diet data for bar and line charts with priority
function groupDietDataForBarLineChart(
  data: UserFoodLog[],
  startDate: Date | null,
  endDate: Date | null
): ChartDataResult {
  const groupedDataByCategoryAndDay: { [day: string]: { [category: string]: number } } = {};
  const allCategories = new Set<string>();

  data.forEach((item) => {
    const date = new Date(item.eatTime);
    const dayKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const category = item.foodCategory || 'Uncategorized';
    const value = parseFloat(item.calories.toString());

    if (!isNaN(value)) {
      if (!groupedDataByCategoryAndDay[dayKey]) {
        groupedDataByCategoryAndDay[dayKey] = {};
      }
      groupedDataByCategoryAndDay[dayKey][category] = (groupedDataByCategoryAndDay[dayKey][category] || 0) + value;
      allCategories.add(category);
    }
  });

  const labels: string[] = [];
  const datasets: ChartDataset<'bar'>[] = [];

  // Generate all dates between startDate and endDate (inclusive)
  if (startDate && endDate) {
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endMonth = endDate.getMonth();

    const sameYear = startYear === endYear;
    const sameMonth = sameYear && startMonth === endMonth;
    
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');
      const dayKey = `${year}-${month}-${day}`;
      
      let displayFormat: string;
      if (sameMonth) { // This implies sameYear is true
        displayFormat = day;
      } else if (sameYear) {
        displayFormat = `${month}-${day}`;
      } else {
        displayFormat = dayKey;
      }

      labels.push(displayFormat);
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }
  }

  // Create a dataset for each category
  Array.from(allCategories).sort().forEach((category, index) => {
    const dataForCategory: number[] = [];
    labels.forEach(label => {
      // Reconstruct the full date key based on the display format used for labels
      let fullDayKey: string;
      if (startDate && endDate) {
        const startYear = startDate.getFullYear();
        const endYear = endDate.getFullYear();
        const startMonth = startDate.getMonth();
        const endMonth = endDate.getMonth();

        const sameYear = startYear === endYear;
        const sameMonth = sameYear && startMonth === endMonth;

        if (sameMonth) { // This implies sameYear is true, label is just day
          fullDayKey = `${startYear}-${(startMonth + 1).toString().padStart(2, '0')}-${label.padStart(2, '0')}`;
        } else if (sameYear) { // label is month-day
          const [month, day] = label.split('-');
          fullDayKey = `${startYear}-${month}-${day}`;
        } else { // label is full date YYYY-MM-DD
          fullDayKey = label;
        }
      } else {
        fullDayKey = label; // Fallback, though startDate/endDate should always be present here
      }
      
      const value = groupedDataByCategoryAndDay[fullDayKey]?.[category] || 0;
      dataForCategory.push(value);
    });

    const colors = getChartColors(1, 0.6, index); // Get a unique color for each category
    datasets.push({
      label: category,
      data: dataForCategory,
      backgroundColor: colors[0],
      borderColor: colors[0],
      borderWidth: 1,
    });
  });

  return {
    labels: labels,
    datasets: datasets,
  };
}

// Function to group diet data for pie charts
function groupDietDataForPieChart(
  data: UserFoodLog[],
  priority: ('foodCategory' | 'foodName')[] = ['foodCategory', 'foodName']
): ChartDataResult {
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
  const backgroundColors = getChartColors(labels.length, 0.6);
  const borderColors = getChartColors(labels.length, 1);

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

export { groupDietDataForBarLineChart, groupDietDataForPieChart };
export type { ChartDataResult };
