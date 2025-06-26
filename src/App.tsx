import React, { useState } from 'react';
import './App.css';
import DateRangeFilter from './components/Shared/DateRangeFilter';
import DietRecords from './components/Records/DietRecords';
import SleepRecords from './components/Records/SleepRecords';
import WeightRecords from './components/Records/WeightRecords';
import ExerciseRecords from './components/Records/ExerciseRecords';

function App() {
  const [activeRecord, setActiveRecord] = useState('diet');

  const handleFilterChange = (startDate: Date, endDate: Date, keyword: string) => {
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('Keyword:', keyword);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-base-200 p-4">
        <h1 className="text-2xl font-bold">Record App</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-base-100 p-4">
          <ul>
            <li onClick={() => setActiveRecord('diet')}>
              <a href="#" className="btn btn-ghost normal-case text-xl">
                Diet Records
              </a>
            </li>
            <li onClick={() => setActiveRecord('sleep')}>
              <a href="#" className="btn btn-ghost normal-case text-xl">
                Sleep Records
              </a>
            </li>
            <li onClick={() => setActiveRecord('weight')}>
              <a href="#" className="btn btn-ghost normal-case text-xl">
                Weight Records
              </a>
            </li>
            <li onClick={() => setActiveRecord('exercise')}>
              <a href="#" className="btn btn-ghost normal-case text-xl">
                Exercise Records
              </a>
            </li>
          </ul>
        </aside>

        {/* Content */}
        <main className="flex-1 p-4">
          {activeRecord === 'diet' && <DietRecords />}
          {activeRecord === 'sleep' && <SleepRecords />}
          {activeRecord === 'weight' && <WeightRecords />}
          {activeRecord === 'exercise' && <ExerciseRecords />}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-base-200 p-4 text-center">
        <p>Copyright 2025</p>
      </footer>
    </div>
  );
}

export default App;
