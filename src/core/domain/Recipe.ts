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

export type Ingredient = {
  quantity: number;
  unitOfMeasurement: string;
  product: string;
};

export type Direction = {
  description: string;
};
