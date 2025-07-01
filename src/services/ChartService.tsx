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
): ChartData {
  const groupedData: { [key: string]: number } = {};
  let primaryGroupingProp: 'day' | 'foodCategory' | 'foodName';
  let labelPrefix: string = '';

  // Determine if all records fall within a single day based on filter dates
  // Only consider grouping by category/food name if both start and end dates are provided and are the same day.
  const allOnSameDay = startDate && endDate && isSameDay(startDate, endDate);

  if (allOnSameDay) {
    const categories = new Set(data.map(item => item.foodCategory));
    if (categories.size > 1) {
      primaryGroupingProp = 'foodCategory';
      labelPrefix = 'Category: ';
    } else {
      primaryGroupingProp = 'foodName';
      labelPrefix = 'Food: ';
    }

    data.forEach((item) => {
      let key: string;
      if (primaryGroupingProp === 'day') {
        const date = new Date(item.eatTime);
        key = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
      } else {
        // Cast to ensure TypeScript knows the property exists on UserFoodLog
        key = item[primaryGroupingProp as 'foodCategory' | 'foodName'];
      }
      const value = parseFloat(item.calories.toString());
      if (!isNaN(value)) {
        groupedData[key] = (groupedData[key] || 0) + value;
      }
    });

    const labels = Object.keys(groupedData).sort();
    const values = labels.map((label) => groupedData[label]);

    return {
      labels: labels.map(label => `${labelPrefix}${label}`),
      datasets: [
        {
          label: 'Calories',
          data: values,
          backgroundColor: labels.map(() => 'rgba(75, 192, 192, 0.6)'),
          borderColor: labels.map(() => 'rgba(75, 192, 192, 1)'),
          borderWidth: 1,
        },
      ],
    };

  } else {
    // Group by day and fill in missing dates with 0
    primaryGroupingProp = 'day';
    labelPrefix = '';

    data.forEach((item) => {
      const date = new Date(item.eatTime);
      const dayKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      const value = parseFloat(item.calories.toString());
      if (!isNaN(value)) {
        groupedData[dayKey] = (groupedData[dayKey] || 0) + value;
      }
    });

    const labels: string[] = [];
    const values: number[] = [];

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

        labels.push(`${labelPrefix}${displayFormat}`);
        values.push(groupedData[dayKey] || 0); // Fill 0 if no data for the day
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
      }
    }

    return {
      labels: labels,
      datasets: [
        {
          label: 'Calories',
          data: values,
          backgroundColor: labels.map(() => 'rgba(75, 192, 192, 0.6)'),
          borderColor: labels.map(() => 'rgba(75, 192, 192, 1)'),
          borderWidth: 1,
        },
      ],
    };
  }
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

export { setChartData, getChartData, groupDietDataForBarLineChart, groupDietDataForPieChart };
export type { ChartData };
