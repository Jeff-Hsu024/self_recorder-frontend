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

const mockDietData: UserFoodLog[] = [
  {
    userFoodLogId: 1,
    user: null,
    foodName: 'Pizza',
    calories: 300,
    description: 'Delicious pizza',
    eatTime: new Date(),
    logTime: new Date(),
    foodCategory: 'Fast Food',
  },
  {
    userFoodLogId: 2,
    user: null,
    foodName: 'Burger',
    calories: 500,
    description: 'Juicy burger',
    eatTime: new Date(),
    logTime: new Date(),
    foodCategory: 'Fast Food',
  },
  {
    userFoodLogId: 3,
    user: null,
    foodName: 'Salad',
    calories: 150,
    description: 'Healthy salad',
    eatTime: new Date(),
    logTime: new Date(),
    foodCategory: 'Healthy',
  },
];

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
