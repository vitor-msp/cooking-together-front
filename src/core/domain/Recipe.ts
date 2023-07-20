import { User } from "./User";

export type Recipe = {
  id?: string;
  title?: string;
  description?: string;
  servings?: number;
  totalTimeInMinutes?: number;
  ingredients?: Ingredient[];
  directions?: Direction[];
  createdAt?: string;
  updatedAt?: string;
  user?: User;
};

type Ingredient = {
  quantity: number;
  unitOfMeasurement: string;
  product: string;
};

type Direction = {
  description: string;
};
