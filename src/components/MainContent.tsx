import React, { useState, useEffect } from 'react';
import FilterForm from './FilterForm';
import { initializeFilterFormSettings, setFilterFormSettings, type FilterFormSettings } from '../services/FilterFormService';

interface MainContentProps {
  children: React.ReactNode;
}

function MainContent({ children }: MainContentProps) {
  const [filterSettings, setFilterSettings] = useState<FilterFormSettings>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 2, new Date().getDate()),
    endDate: new Date(),
    keyword: '',
  });

  useEffect(() => {
    initializeFilterFormSettings(filterSettings);
  }, []);

  const handleFilterChange = (startDate: Date, endDate: Date, keyword: string) => {
    const newSettings = { startDate, endDate, keyword };
    setFilterSettings(newSettings);
    setFilterFormSettings(newSettings);
  };

  return (
    <main className="container mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">Main Content</h2>
      <FilterForm onFilterChange={handleFilterChange} />
      {children}
    </main>
  );
}

export default MainContent;
