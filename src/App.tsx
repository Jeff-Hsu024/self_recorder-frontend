import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/Dashboard';
import DietRecords from './components/records/DietRecords';
import SleepRecords from './components/records/SleepRecords';
import WeightRecords from './components/records/WeightRecords';
import ExerciseRecords from './components/records/ExerciseRecords';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/diet" replace />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="diet" element={<DietRecords />} />
          <Route path="sleep" element={<SleepRecords />} />
          <Route path="weight" element={<WeightRecords />} />
          <Route path="exercise" element={<ExerciseRecords />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
