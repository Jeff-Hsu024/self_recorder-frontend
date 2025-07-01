import { useState, useEffect, useRef } from 'react';
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
  const drawerToggleRef = useRef<HTMLInputElement>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    initializeFilterFormSettings(filterSettings);
  }, []);

  const handleFilterChange = (startDate: Date, endDate: Date, keyword: string) => {
    const newSettings = { startDate, endDate, keyword };
    setFilterSettings(newSettings);
    setFilterFormSettings(newSettings);
  };

  const handleSidebarClick = (event: React.MouseEvent) => {
    // Check if the click target is not a NavLink or its child
    const target = event.target as HTMLElement;
    if (!target.closest('.nav-link-item') && drawerToggleRef.current) {
      if (window.innerWidth >= 1024) { // Only collapse on large screens and above
        setIsSidebarCollapsed(!isSidebarCollapsed);
      } else { // Always close the drawer on small screens
        drawerToggleRef.current.checked = false;
      }
    }
  };

  return (
    <div className="drawer lg:drawer-open pt-4">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" ref={drawerToggleRef} />
      <div className="drawer-content flex flex-col pl-4 pr-8 w-full">
        <label htmlFor="my-drawer-2" className="btn btn-outline drawer-button lg:hidden mt-4">Open menu</label>
        <FilterForm onFilterChange={handleFilterChange} />
        <br />
        <Outlet />
      </div>
      <div className={`drawer-side ${isSidebarCollapsed ? 'lg:sidebar-collapsed' : ''} h-full`} onClick={handleSidebarClick}>
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className={`menu p-4 min-h-full bg-base-200 text-base-content lg:${isSidebarCollapsed ? 'w-20' : 'w-80'} w-80`}>
          {/* Sidebar content here */}
          <li>
            <NavLink
              to="diet"
              className={({ isActive }) => (isActive ? 'active nav-link-item' : 'nav-link-item')}
            >
              <IconRender iconName="MdFastfood" className="size-5" />
              <span className={`sidebar-text-content ${isSidebarCollapsed ? 'lg:hidden-text' : ''}`}>Diet Records</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="sleep"
              className={({ isActive }) => (isActive ? 'active nav-link-item' : 'nav-link-item')}
            >
              <IconRender iconName="MdKingBed" className="size-5" />
              <span className={`sidebar-text-content ${isSidebarCollapsed ? 'lg:hidden-text' : ''}`}>Sleep Records</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="weight"
              className={({ isActive }) => (isActive ? 'active nav-link-item' : 'nav-link-item')}
            >
              <IconRender iconName="MdMonitorWeight" className="size-5" />
              <span className={`sidebar-text-content ${isSidebarCollapsed ? 'lg:hidden-text' : ''}`}>Weight Records</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="exercise"
              className={({ isActive }) => (isActive ? 'active nav-link-item' : 'nav-link-item')}
            >
              <IconRender iconName="MdFitnessCenter" className="size-5" />
              <span className={`sidebar-text-content ${isSidebarCollapsed ? 'lg:hidden-text' : ''}`}>Exercise Records</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
