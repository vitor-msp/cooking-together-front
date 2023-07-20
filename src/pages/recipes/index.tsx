import React, { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import { getRecipesMock } from "@/src/mocks/recipes";
import { Recipe } from "@/src/domain/Recipe";
import Link from "next/link";

type RecipesPageProps = {
  recipes: Recipe[];
};

const RecipesPage: NextPage<RecipesPageProps> = ({ recipes }) => {
  return (
    <div>
      <h1>RecipesPage</h1>
      <ul>
        {recipes?.map(
          ({ id, servings, title, totalTimeInMinutes, updatedAt }) => {
            return (
              <li key={id}>
                {/* passHref */}
                <Link href={`/recipes/${id}`}>
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

export default RecipesPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const recipes = getRecipesMock();
  return {
    props: {
      recipes,
    },
  };
};
