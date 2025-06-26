import React, { useState, useEffect } from 'react';
import DietRecords from '../records/DietRecords';
import SleepRecords from '../records/SleepRecords';
import WeightRecords from '../records/WeightRecords';
import ExerciseRecords from '../records/ExerciseRecords';
import Charts from './Charts';
import FilterForm from './FilterForm';
import { initializeFilterFormSettings, setFilterFormSettings, type FilterFormSettings } from '../../services/FilterFormService';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('diet');
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
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col p-4 w-full">
        <label htmlFor="my-drawer-2" className="btn btn-outline btn-neutral drawer-button lg:hidden mt-4">Open menu</label>
        <FilterForm onFilterChange={handleFilterChange} />
        {activeTab === 'diet' && <DietRecords />}
        {activeTab === 'sleep' && <SleepRecords />}
        {activeTab === 'weight' && <WeightRecords />}
        {activeTab === 'exercise' && <ExerciseRecords />}
        <Charts />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <a
              className={activeTab === 'diet' ? 'active' : ''}
              onClick={() => setActiveTab('diet')}
            >
              Diet Records
            </a>
          </li>
          <li>
            <a
              className={activeTab === 'sleep' ? 'active' : ''}
              onClick={() => setActiveTab('sleep')}
            >
              Sleep Records
            </a>
          </li>
          <li>
            <a
              className={activeTab === 'weight' ? 'active' : ''}
              onClick={() => setActiveTab('weight')}
            >
              Weight Records
            </a>
          </li>
          <li>
            <a
              className={activeTab === 'exercise' ? 'active' : ''}
              onClick={() => setActiveTab('exercise')}
            >
              Exercise Records
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
