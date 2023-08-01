import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { Recipe } from "@/src/core/domain/Recipe";
import { getRecipesUsecase } from "@/src/factory";
import { Cookie } from "@/src/utils/Cookie";
import { Query } from "@/src/utils/Query";
import Recipes from "@/src/components/Recipes";
import SearchRecipes from "@/src/components/SearchRecipes";

type RecipesPageProps = {
  recipes: Recipe[];
};

const RecipesPage: NextPage<RecipesPageProps> = ({ recipes }) => {
  return (
    <div className="flex flex-col items-center justify-start self-start w-screen">
      <SearchRecipes />
      <Recipes recipes={recipes} publicView={true} />
    </div>
  );
};

export default RecipesPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = Query.getQuery(context.req.url);
  const recipes = await getRecipesUsecase.execute(
    Cookie.getUser(context.req.cookies),
    query
  );
  return {
    props: {
      recipes,
    },
  };
};
