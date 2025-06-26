import { of } from 'rxjs';

interface UserFoodLog {
  userFoodLogId: number;
  user: any; // TODO: Define User interface
  foodName: string;
  calories: number;
  description: string;
  eatTime: Date;
  logTime: Date;
  foodCategory: string;
}

const generateMockDietData = (count: number): UserFoodLog[] => {
  const data: UserFoodLog[] = [];
  const foodNames = ['Pizza', 'Burger', 'Salad', 'Steak', 'Chicken', 'Fish', 'Pasta', 'Rice', 'Bread', 'Eggs', 'Milk', 'Cheese', 'Yogurt', 'Apple', 'Banana', 'Orange', 'Grapes', 'Carrot', 'Broccoli', 'Spinach'];
  const foodCategories = ['Fast Food', 'Healthy', 'Meat', 'Seafood', 'Italian', 'Grain', 'Protein', 'Dairy', 'Fruit', 'Vegetable'];

  for (let i = 1; i <= count; i++) {
    const randomFoodName = foodNames[Math.floor(Math.random() * foodNames.length)];
    const randomCalories = Math.floor(Math.random() * 600) + 50; // 50-650 calories
    const randomCategory = foodCategories[Math.floor(Math.random() * foodCategories.length)];
    const randomDate = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000); // Last 30 days

    data.push({
      userFoodLogId: i,
      user: null,
      foodName: `${randomFoodName} ${i}`,
      calories: randomCalories,
      description: `Description for ${randomFoodName} ${i}`,
      eatTime: randomDate,
      logTime: new Date(),
      foodCategory: randomCategory,
    });
  }
  return data;
};

const mockDietData: UserFoodLog[] = generateMockDietData(200);

const getDietRecords = (startDate: Date, endDate: Date, keyword: string) => {
  const filteredData = mockDietData.filter((record) => {
    const eatTime = new Date(record.eatTime);
    const keywordMatch = keyword ? record.foodName.toLowerCase().includes(keyword.toLowerCase()) : true;
    return eatTime >= startDate && eatTime <= endDate && keywordMatch;
  });
  return of(filteredData);
};

export { getDietRecords };
export type { UserFoodLog };
