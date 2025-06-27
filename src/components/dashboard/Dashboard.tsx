import { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import FilterForm from './FilterForm';
import IconRender from '../utility/IconRender';
import { initializeFilterFormSettings, setFilterFormSettings, type FilterFormSettings } from '../../services/FilterFormService';

function Dashboard() {
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
        <label htmlFor="my-drawer-2" className="btn btn-outline drawer-button lg:hidden mt-4">Open menu</label>
        <FilterForm onFilterChange={handleFilterChange} />
        <br />
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <NavLink
              to="diet"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <IconRender iconName="MdFastfood" className="size-5" />
              Diet Records
            </NavLink>
          </li>
          <li>
            <NavLink
              to="sleep"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <IconRender iconName="MdKingBed" className="size-5" />
              Sleep Records
            </NavLink>
          </li>
          <li>
            <NavLink
              to="weight"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <IconRender iconName="MdMonitorWeight" className="size-5" />
              Weight Records
            </NavLink>
          </li>
          <li>
            <NavLink
              to="exercise"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <IconRender iconName="MdFitnessCenter" className="size-5" />
              Exercise Records
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
