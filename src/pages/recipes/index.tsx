import React, { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { getRecipesMock } from "@/src/mocks/recipes";
import { Recipe } from "@/src/domain/Recipe";

type RecipesPageProps = {
  recipes: Recipe[];
};

const RecipesPage: NextPage<RecipesPageProps> = ({ recipes }) => {
  useEffect(() => {
    console.log(recipes);
  }, []);
  return (
    <div>
      <h1>RecipesPage</h1>
      <ul>
        {recipes?.map(
          ({ id, servings, title, totalTimeInMinutes, updatedAt }) => {
            return (
              <li
                key={id}
              >{`${servings} ${title} ${totalTimeInMinutes} ${updatedAt}`}</li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default RecipesPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const recipes = getRecipesMock();
  return {
    props: {
      recipes,
    },
  };
};
