import React from 'react';
// import FilterForm from './FilterForm'; // Remove FilterForm import
// import { initializeFilterFormSettings, setFilterFormSettings, type FilterFormSettings } from '../services/FilterFormService'; // Remove filter services import
import Dashboard from './Dashboard'; // Import Dashboard

interface MainContentProps {
  // children: React.ReactNode; // No longer needed as Dashboard is directly rendered
}

function MainContent(/* { children }: MainContentProps */) { // Remove children prop
  // Remove filter settings state and useEffect
  // const [filterSettings, setFilterSettings] = useState<FilterFormSettings>({
  //   startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 2, new Date().getDate()),
  //   endDate: new Date(),
  //   keyword: '',
  // });

  // useEffect(() => {
  //   initializeFilterFormSettings(filterSettings);
  // }, []);

  // Remove handleFilterChange
  // const handleFilterChange = (startDate: Date, endDate: Date, keyword: string) => {
  //   const newSettings = { startDate, endDate, keyword };
  //   setFilterSettings(newSettings);
  //   setFilterFormSettings(newSettings);
  // };

  return (
    <main className="container mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">Main Content</h2>
      {/* Remove FilterForm */}
      {/* <FilterForm onFilterChange={handleFilterChange} /> */}
      <Dashboard /> {/* Render Dashboard directly here */}
    </main>
  );
}

export default MainContent;
