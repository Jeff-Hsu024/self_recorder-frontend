import React, { useState, useEffect, useMemo } from 'react';
import { getDietRecords, UserFoodLog } from '../../services/DietService';
import { setChartData } from '../../services/ChartService';
import { getFilterFormSettings } from '../../services/FilterFormService';
import CustomDataGrid from '../layout/CustomDataGrid';
import CustomDataGridService from '../../services/CustomDataGridService';
import Charts from '../dashboard/Charts';
import IconRender from '../utility/IconRender';

const dietDataGridService = new CustomDataGridService<UserFoodLog>();

function DietRecords() {
  const [dataGridState, setDataGridState] = useState(dietDataGridService['dataSubject'].getValue());

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
    const filterSubscription = getFilterFormSettings().subscribe((filterSettings) => {
      getDietRecords(filterSettings.startDate, filterSettings.endDate, filterSettings.keyword).subscribe((data) => {
        dietDataGridService.setData(data, 0); // Reset offset to 0 when new data is fetched

        const labels = data.map((record) => record.foodName);
        const calories = data.map((record) => record.calories);

        const chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Calories',
              data: calories,
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

        setChartData(chartData);
      });
    });
    return () => filterSubscription.unsubscribe();
  }, []); // Only re-run when filter settings change (implicitly handled by subscription)

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
      <label className="tab">
        <input type="radio" name="my_tabs_4" defaultChecked />
        <IconRender iconName="MdFastfood" className="size-4 me-2" />
        Charts
      </label>
      <div className="tab-content bg-base-100 border-base-300 p-6">
        <Charts />
      </div>
      <label className="tab">
        <input type="radio" name="my_tabs_4" />
        <IconRender iconName="MdFastfood" className="size-4 me-2" />
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
              <div className="flex items-center cursor-pointer" onClick={() => handleSort(col.accessor as keyof UserFoodLog)}>
                {col.header}
                {dataGridState.sortColumn === col.accessor && (
                  dataGridState.sortDirection === 'asc' ? (
                    <IconRender iconName="MdArrowUpward" className="size-4 ml-1" />
                  ) : (
                    <IconRender iconName="MdArrowDownward" className="size-4 ml-1" />
                  )
                )}
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
