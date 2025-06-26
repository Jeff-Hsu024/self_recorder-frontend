import { BehaviorSubject } from 'rxjs';

interface FilterFormSettings {
  startDate: Date;
  endDate: Date;
  keyword: string;
}

const initialSettings: FilterFormSettings = {
  startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 2, new Date().getDate()),
  endDate: new Date(),
  keyword: '',
};

const filterFormSettings$ = new BehaviorSubject<FilterFormSettings>(initialSettings);

const setFilterFormSettings = (settings: FilterFormSettings) => {
  filterFormSettings$.next(settings);
};

const getFilterFormSettings = () => {
  return filterFormSettings$.asObservable();
};

const initializeFilterFormSettings = (settings: FilterFormSettings) => {
  setFilterFormSettings(settings);
};

export {
  setFilterFormSettings,
  getFilterFormSettings,
  initializeFilterFormSettings,
  type FilterFormSettings,
};
