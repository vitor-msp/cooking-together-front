import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { Recipe } from "@/src/core/domain/Recipe";
import Link from "next/link";
import { getMyRecipesUsecase } from "@/src/factory";
import { Cookie } from "@/src/utils/Cookie";
import Recipes from "@/src/components/Recipes";

type MyRecipesPageProps = {
  recipes: Recipe[];
};

const MyRecipesPage: NextPage<MyRecipesPageProps> = ({ recipes }) => {
  return (
    <div>
      <h1>MyRecipesPage</h1>
      <button type="button">
        <Link href={`/my-recipes/new`}>add new recipe</Link>
      </button>
      <Recipes recipes={recipes} />
    </div>
  );
};

export default MyRecipesPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const myRecipes = await getMyRecipesUsecase.execute(
    Cookie.getUser(context.req.cookies)
  );
  return {
    props: {
      recipes: myRecipes,
    },
  };
};
