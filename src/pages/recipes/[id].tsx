import React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Recipe } from "@/src/domain/Recipe";
import { getRecipesMock } from "@/src/mocks/recipes";
import Link from "next/link";

type RecipePageProps = {
  recipe: Recipe;
};

const RecipePage: NextPage<RecipePageProps> = ({ recipe }) => {
  const { id, servings, title, totalTimeInMinutes, updatedAt } = recipe;
  return (
    <div>
      <Link href={"/recipes"}>home</Link>
      <br />
      {`${id} ${servings} ${title} ${totalTimeInMinutes} ${updatedAt}`}
    </div>
  );
};

export default RecipePage;

export const getStaticPaths: GetStaticPaths = async (context) => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id ?? "0";
  const recipe = getRecipesMock().find((r) => r.id === id);
  return { props: { recipe }, revalidate: 10 };
};
