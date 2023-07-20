import { Recipe } from "../domain/Recipe";

export const getRecipesMock = (): Recipe[] => {
  return [
    {
      id: "1",
      title: "title",
      servings: 1,
      totalTimeInMinutes: 50,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "1",
      title: "title",
      servings: 1,
      totalTimeInMinutes: 50,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "1",
      title: "title",
      servings: 1,
      totalTimeInMinutes: 50,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "1",
      title: "title",
      servings: 1,
      totalTimeInMinutes: 50,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "1",
      title: "title",
      servings: 1,
      totalTimeInMinutes: 50,
      updatedAt: new Date().toISOString(),
    },
  ];
};
