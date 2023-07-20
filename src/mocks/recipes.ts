import { Recipe } from "../domain/Recipe";

export const getRecipesMock = (): Recipe[] => {
  let id = 0;
  return [
    {
      id: (id++).toString(),
      title: "title",
      servings: 1,
      totalTimeInMinutes: 50,
      updatedAt: new Date().toISOString(),
    },
    {
      id: (id++).toString(),
      title: "title",
      servings: 1,
      totalTimeInMinutes: 50,
      updatedAt: new Date().toISOString(),
    },
    {
      id: (id++).toString(),
      title: "title",
      servings: 1,
      totalTimeInMinutes: 50,
      updatedAt: new Date().toISOString(),
    },
    {
      id: (id++).toString(),
      title: "title",
      servings: 1,
      totalTimeInMinutes: 50,
      updatedAt: new Date().toISOString(),
    },
    {
      id: (id++).toString(),
      title: "title",
      servings: 1,
      totalTimeInMinutes: 50,
      updatedAt: new Date().toISOString(),
    },
  ];
};
