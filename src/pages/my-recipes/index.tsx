import React, { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Recipe } from "@/src/core/domain/Recipe";
import Link from "next/link";
import { getMyRecipesMock } from "@/src/mocks/myrecipes";

type MyRecipesPageProps = {
  recipes: Recipe[];
};

const MyRecipesPage: NextPage<MyRecipesPageProps> = ({ recipes }) => {
  const addRecipe = () => {};

  return (
    <div>
      <h1>MyRecipesPage</h1>
      <button type="button">
        <Link href={`/my-recipes/new`}>add new recipe</Link>
      </button>
      <ul>
        {recipes?.map(
          ({ id, servings, title, totalTimeInMinutes, updatedAt }) => {
            return (
              <li key={id}>
                {/* passHref */}
                <Link href={`/my-recipes/${id}`}>
                  {`${servings} ${title} ${totalTimeInMinutes} ${updatedAt}`}
                </Link>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default MyRecipesPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const myRecipes = getMyRecipesMock();
  return {
    props: {
      recipes: myRecipes,
    },
  };
};
