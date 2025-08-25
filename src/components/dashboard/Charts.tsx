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
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import { ChartDataset, ChartData } from 'chart.js';

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
  labels: string[];
  datasets: ChartDataset<any>[]; // Use any for flexibility
}

function Charts({ chartType, title, labels, datasets }: ChartsProps) {
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <BarChart labels={labels} datasets={datasets as ChartDataset<'bar'>[]} title={title} />;
      case 'pie':
        const pieChartData: ChartData<'pie'> = { labels, datasets: datasets as ChartDataset<'pie'>[] };
        return <PieChart chartData={pieChartData} title={title} />;
      case 'line':
        const lineChartData: ChartData<'line'> = { labels, datasets: datasets as ChartDataset<'line'>[] };
        return <LineChart chartData={lineChartData} title={title} />;
      default:
        return <BarChart labels={labels} datasets={datasets as ChartDataset<'bar'>[]} title={title} />;
    }
  };

  return (
    <div className="relative bg-base-100 rounded-lg shadow-md p-4 w-full lg:w-full mx-auto h-120">
      {renderChart()}
    </div>
  );
}

export default Charts;
