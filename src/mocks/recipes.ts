import { Recipe } from "../domain/Recipe";

export const getRecipesMock = (): Recipe[] => {
  let id = 0;
  return [
    {
      id: (id++).toString(),
      title: "recipe 1",
      servings: 1,
      totalTimeInMinutes: 50,
      updatedAt: new Date().toISOString(),
    },
    {
      id: (id++).toString(),
      title: "recipe 1",
      servings: 1,
      totalTimeInMinutes: 50,
      updatedAt: new Date().toISOString(),
    },
    {
      id: (id++).toString(),
      title: "recipe 1",
      servings: 1,
      totalTimeInMinutes: 50,
      updatedAt: new Date().toISOString(),
    },
    {
      id: (id++).toString(),
      title: "recipe 1",
      servings: 1,
      totalTimeInMinutes: 50,
      updatedAt: new Date().toISOString(),
    },
    {
      id: (id++).toString(),
      title: "recipe 1",
      servings: 1,
      totalTimeInMinutes: 50,
      updatedAt: new Date().toISOString(),
    },
  ];
};

export const getRecipeMock = (): Recipe => {
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
