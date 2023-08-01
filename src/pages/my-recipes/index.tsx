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
    <div className="flex flex-col items-center justify-start self-start w-screen">
      <h1 className="text-center text-orange-600 text-3xl my-3">My Recipes</h1>
      <button
        type="button"
        className="bg-orange-500 py-1 px-2 text-xl hover:text-orange-500 hover:bg-orange-200 text-gray-100 rounded-md transition-all"
      >
        <Link href={`/my-recipes/new`}>+ new recipe</Link>
      </button>
      <Recipes recipes={recipes} publicView={false} />
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
