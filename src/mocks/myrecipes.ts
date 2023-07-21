import { Recipe } from "../core/domain/Recipe";

export const getMyRecipeMock = (): Recipe => {
  return {
    id: "1",
    title: "recipe 1",
    description: "mocked recipe ",
    servings: 5,
    totalTimeInMinutes: 30,
    ingredients: [
      {
        quantity: 5,
        unitOfMeasurement: "kg",
        product: "potato",
      },
      {
        quantity: 5,
        unitOfMeasurement: "L",
        product: "milk",
      },
    ],
    directions: [
      {
        description: "çqwkjjjoqjhb",
      },
      {
        description: "kje2bhb",
      },
      {
        description: "jwhvowhj",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: "1",
      name: "fulan",
    },
  };
};
