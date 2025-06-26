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
  {
    userFoodLogId: 4,
    user: null,
    foodName: 'Steak',
    calories: 700,
    description: 'Grilled steak',
    eatTime: new Date(),
    logTime: new Date(),
    foodCategory: 'Meat',
  },
  {
    userFoodLogId: 5,
    user: null,
    foodName: 'Chicken',
    calories: 400,
    description: 'Roasted chicken',
    eatTime: new Date(),
    logTime: new Date(),
    foodCategory: 'Meat',
  },
  {
    userFoodLogId: 6,
    user: null,
    foodName: 'Fish',
    calories: 300,
    description: 'Baked fish',
    eatTime: new Date(),
    logTime: new Date(),
    foodCategory: 'Seafood',
  },
  {
    userFoodLogId: 7,
    user: null,
    foodName: 'Pasta',
    calories: 600,
    description: 'Spaghetti with tomato sauce',
    eatTime: new Date(),
    logTime: new Date(),
    foodCategory: 'Italian',
  },
  {
    userFoodLogId: 8,
    user: null,
    foodName: 'Rice',
    calories: 200,
    description: 'White rice',
    eatTime: new Date(),
    logTime: new Date(),
    foodCategory: 'Grain',
  },
  {
    userFoodLogId: 9,
    user: null,
    foodName: 'Bread',
    calories: 150,
    description: 'Whole wheat bread',
    eatTime: new Date(),
    logTime: new Date(),
    foodCategory: 'Grain',
  },
  {
    userFoodLogId: 10,
    user: null,
    foodName: 'Eggs',
    calories: 80,
    description: 'Scrambled eggs',
    eatTime: new Date(),
    logTime: new Date(),
    foodCategory: 'Protein',
  },
  {
    userFoodLogId: 11,
    user: null,
    foodName: 'Milk',
    calories: 100,
    description: 'Whole milk',
    eatTime: new Date(),
    logTime: new Date(),
    foodCategory: 'Dairy',
  },
  {
    userFoodLogId: 12,
    user: null,
    foodName: 'Cheese',
    calories: 120,
    description: 'Cheddar cheese',
    eatTime: new Date(),
    logTime: new Date(),
    foodCategory: 'Dairy',
  },
  {
    userFoodLogId: 13,
    user: null,
    foodName: 'Yogurt',
    calories: 150,
    description: 'Greek yogurt',
    eatTime: new Date(),
    logTime: new Date(),
    foodCategory: 'Dairy',
  },
  {
    userFoodLogId: 14,
    user: null,
    foodName: 'Apple',
    calories: 95,
    description: 'Red apple',
    eatTime: new Date(),
    logTime: new Date(),
    foodCategory: 'Fruit',
  },
  {
    userFoodLogId: 15,
    user: null,
    foodName: 'Banana',
    calories: 105,
    description: 'Yellow banana',
    eatTime: new Date(),
    logTime: new Date(),
    foodCategory: 'Fruit',
  },
  {
    userFoodLogId: 16,
    user: null,
    foodName: 'Orange',
    calories: 62,
    description: 'Navel orange',
    eatTime: new Date(),
    logTime: new Date(),
    foodCategory: 'Fruit',
  },
  {
    userFoodLogId: 17,
    user: null,
    foodName: 'Grapes',
    calories: 104,
    description: 'Green grapes',
    eatTime: new Date(),
    logTime: new Date(),
    foodCategory: 'Fruit',
  },
  {
    userFoodLogId: 18,
    user: null,
    foodName: 'Carrot',
    calories: 25,
    description: 'Orange carrot',
    eatTime: new Date(),
    logTime: new Date(),
    foodCategory: 'Vegetable',
  },
  {
    userFoodLogId: 19,
    user: null,
    foodName: 'Broccoli',
    calories: 55,
    description: 'Green broccoli',
    eatTime: new Date(),
    logTime: new Date(),
    foodCategory: 'Vegetable',
  },
  {
    userFoodLogId: 20,
    user: null,
    foodName: 'Spinach',
    calories: 7,
    description: 'Green spinach',
    eatTime: new Date(),
    logTime: new Date(),
    foodCategory: 'Vegetable',
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
