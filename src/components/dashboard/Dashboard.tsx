import React, { useState, useEffect } from 'react';
import DietRecords from '../records/DietRecords';
import SleepRecords from '../records/SleepRecords';
import WeightRecords from '../records/WeightRecords';
import ExerciseRecords from '../records/ExerciseRecords';
import FilterForm from './FilterForm';
import IconRender from '../utility/IconRender';
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
      <div className="drawer-content flex flex-col pl-4 w-full">
        <label htmlFor="my-drawer-2" className="btn btn-outline btn-neutral drawer-button lg:hidden mt-4">Open menu</label>
        <FilterForm onFilterChange={handleFilterChange} />
        <br />
        {activeTab === 'diet' && <DietRecords />}
        {activeTab === 'sleep' && <SleepRecords />}
        {activeTab === 'weight' && <WeightRecords />}
        {activeTab === 'exercise' && <ExerciseRecords />}
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
              <IconRender iconName="MdFastfood" className="size-5" />
              Diet Records
            </a>
          </li>
          <li>
            <a
              className={activeTab === 'sleep' ? 'active' : ''}
              onClick={() => setActiveTab('sleep')}
            >
              <IconRender iconName="MdKingBed" className="size-5" />
              Sleep Records
            </a>
          </li>
          <li>
            <a
              className={activeTab === 'weight' ? 'active' : ''}
              onClick={() => setActiveTab('weight')}
            >
              <IconRender iconName="MdMonitorWeight" className="size-5" />
              Weight Records
            </a>
          </li>
          <li>
            <a
              className={activeTab === 'exercise' ? 'active' : ''}
              onClick={() => setActiveTab('exercise')}
            >
              <IconRender iconName="MdFitnessCenter" className="size-5" />
              Exercise Records
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
