import React, { useState } from 'react';
import DietRecords from './DietRecords';
import SleepRecords from './SleepRecords';
import WeightRecords from './WeightRecords';
import ExerciseRecords from './ExerciseRecords';
import Charts from './Charts';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('diet');

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-bold ${activeTab === 'diet' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('diet')}
        >
          Diet
        </button>
        <button
          className={`px-4 py-2 font-bold ${activeTab === 'sleep' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('sleep')}
        >
          Sleep
        </button>
        <button
          className={`px-4 py-2 font-bold ${activeTab === 'weight' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('weight')}
        >
          Weight
        </button>
        <button
          className={`px-4 py-2 font-bold ${activeTab === 'exercise' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('exercise')}
        >
          Exercise
        </button>
      </div>

      <div className="py-4">
        {activeTab === 'diet' && <DietRecords />}
        {activeTab === 'sleep' && <SleepRecords />}
        {activeTab === 'weight' && <WeightRecords />}
        {activeTab === 'exercise' && <ExerciseRecords />}
      </div>

      <Charts />
    </div>
  );
}

export default Dashboard;
