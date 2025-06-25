import { BehaviorSubject } from 'rxjs';

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

export { setChartData, getChartData };
export type { ChartData };
