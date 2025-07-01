import React, { useState, useEffect, useMemo } from 'react';
import { getDietRecords, UserFoodLog } from '../../services/DietService';
import { setChartData, groupDietDataForBarLineChart, groupDietDataForPieChart } from '../../services/ChartService';
import { getFilterFormSettings } from '../../services/FilterFormService';
import CustomDataGrid from '../layout/CustomDataGrid';
import CustomDataGridService from '../../services/CustomDataGridService';
import Charts from '../dashboard/Charts';
import IconRender from '../utility/IconRender';

const dietDataGridService = new CustomDataGridService<UserFoodLog>();

type ChartType = 'bar' | 'line' | 'pie';

import { FilterFormSettings } from '../../services/FilterFormService'; // Import FilterFormSettings

function DietRecords() {
  const [dataGridState, setDataGridState] = useState(dietDataGridService['dataSubject'].getValue());
  const [currentChartType, setCurrentChartType] = useState<ChartType>('bar');
  const [dietRecords, setDietRecords] = useState<UserFoodLog[]>([]);
  const [filterSettings, setFilterSettings] = useState<FilterFormSettings>({
    startDate: new Date(),
    endDate: new Date(),
    keyword: '',
  });

  const dietColumns = useMemo(() => [
    { header: 'Food Name', accessor: 'foodName' },
    { header: 'Calories', accessor: 'calories' },
    { header: 'Description', accessor: 'description' },
    { header: 'Eat Time', accessor: 'eatTime', render: (item: UserFoodLog) => item.eatTime.toLocaleString() },
    { header: 'Category', accessor: 'foodCategory' },
  ], []);

  useEffect(() => {
    const subscription = dietDataGridService.getDataGridState().subscribe(setDataGridState);
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const filterSubscription = getFilterFormSettings().subscribe((settings) => {
      setFilterSettings(settings); // Store filter settings in state
      getDietRecords(settings.startDate, settings.endDate, settings.keyword).subscribe((data) => {
        setDietRecords(data); // Store raw data for chart processing
        dietDataGridService.setData(data, 0); // Reset offset to 0 when new data is fetched
      });
    });
    return () => filterSubscription.unsubscribe();
  }, []);

  useEffect(() => {
    let chartData;
    // Ensure filterSettings are available before attempting to group data for bar/line charts
    if (filterSettings.startDate !== null && filterSettings.endDate !== null) {
      switch (currentChartType) {
        case 'bar':
        case 'line':
          chartData = groupDietDataForBarLineChart(dietRecords, filterSettings.startDate, filterSettings.endDate);
          // Label is now set within the grouping function
          chartData.datasets[0].backgroundColor = chartData.labels.map(() => 'rgba(75, 192, 192, 0.6)');
          chartData.datasets[0].borderColor = chartData.labels.map(() => 'rgba(75, 192, 192, 1)');
          break;
        case 'pie':
          chartData = groupDietDataForPieChart(dietRecords, ['foodCategory', 'foodName']);
          chartData.datasets[0].label = 'Calories by Category/Food';
          break;
        default:
          // Default to a basic chart if no type is selected or recognized
          chartData = {
            labels: dietRecords.map((record) => record.foodName),
            datasets: [
              {
                label: 'Calories',
                data: dietRecords.map((record) => record.calories),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
              },
            ],
          };
          break;
      }
      setChartData(chartData);
    }
  }, [dietRecords, currentChartType, filterSettings]); // Re-run when dietRecords, chart type, or filterSettings change

  const handlePageClick = (selectedPage: number) => {
    const newOffset = (selectedPage * dataGridState.itemsPerPage);
    dietDataGridService.setItemOffset(newOffset);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    if (!isNaN(newItemsPerPage) && newItemsPerPage > 0) {
      dietDataGridService.setItemsPerPage(newItemsPerPage);
    }
  };

  const handleSort = (column: keyof UserFoodLog) => {
    dietDataGridService.setSort(column);
  };

  return (
    <div className="tabs tabs-lift">
      <label htmlFor="charts_tab" className="tab">
        <input type="radio" name="my_tabs_4" id="charts_tab" defaultChecked />
        <IconRender iconName="MdInsertChart" className="size-4 me-2" />
        Charts
      </label>
      <div className="tab-content bg-base-100 border-base-300 p-6">
        <div role="tablist" className="tabs tabs-boxed mb-4">
          <a
            role="tab"
            className={`tab ${currentChartType === 'bar' ? 'tab-active' : ''}`}
            onClick={() => setCurrentChartType('bar')}
          >
            <IconRender iconName="MdBarChart" className="size-4 me-2" />
            Bar Chart
          </a>
          <a
            role="tab"
            className={`tab ${currentChartType === 'line' ? 'tab-active' : ''}`}
            onClick={() => setCurrentChartType('line')}
          >
            <IconRender iconName="MdShowChart" className="size-4 me-2" />
            Line Chart
          </a>
          <a
            role="tab"
            className={`tab ${currentChartType === 'pie' ? 'tab-active' : ''}`}
            onClick={() => setCurrentChartType('pie')}
          >
            <IconRender iconName="MdPieChart" className="size-4 me-2" />
            Pie Chart
          </a>
        </div>
        <Charts chartType={currentChartType} title="Diet Records" />
      </div>

      <label htmlFor="records_tab" className="tab">
        <input type="radio" name="my_tabs_4" id="records_tab" />
        <IconRender iconName="MdListAlt" className="size-4 me-2" />
        Records
      </label>
      <div className="tab-content bg-base-100 border-base-300 p-6">
        <div className="mb-4">
          <label htmlFor="itemsPerPage" className="label">
            <span className="label-text">size:</span>
          </label>
          <input
            type="number"
            id="itemsPerPage"
            className="input input-bordered w-20"
            value={dataGridState.itemsPerPage}
            onChange={handleItemsPerPageChange}
            min="1"
          />
        </div>
        <CustomDataGrid
          data={dataGridState.displayData}
          columns={dietColumns.map(col => ({
            ...col,
            header: (
              <div className="flex items-center">
                {/* Only allow sorting on larger screens (lg and up) */}
                <div className="hidden lg:flex items-center cursor-pointer" onClick={() => handleSort(col.accessor as keyof UserFoodLog)}>
                  {col.header}
                  {dataGridState.sortColumn === col.accessor && (
                    dataGridState.sortDirection === 'asc' ? (
                      <IconRender iconName="MdArrowUpward" className="size-4 ml-1" />
                    ) : (
                      <IconRender iconName="MdArrowDownward" className="size-4 ml-1" />
                    )
                  )}
                </div>
                {/* Show plain header on smaller screens */}
                <span className="lg:hidden">{col.header}</span>
              </div>
            ),
          }))}
          pageCount={dataGridState.pageCount}
          onPageChange={handlePageClick}
          currentPage={dataGridState.itemOffset / dataGridState.itemsPerPage}
        />
      </div>
    </div>
  );
}

export default DietRecords;
