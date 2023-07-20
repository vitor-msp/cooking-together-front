import React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Recipe } from "@/src/domain/Recipe";
import { getRecipeMock, getRecipesMock } from "@/src/mocks/recipes";
import Link from "next/link";

type RecipePageProps = {
  recipe: Recipe;
};

const RecipePage: NextPage<RecipePageProps> = ({ recipe }) => {
  const {
    id,
    servings,
    title,
    totalTimeInMinutes,
    updatedAt,
    createdAt,
    description,
    directions,
    ingredients,
    user,
  } = recipe;
  return (
    <div>
      <Link href={"/recipes"}>home</Link>
      <br />
      {`${id} ${servings} ${title} ${totalTimeInMinutes} ${updatedAt}`}
      <br />
      {`${createdAt} ${description} `}
      <br />
      <span>{`${user?.id} - ${user?.name}`}</span>
      <br />
      <span>directions</span>
      <ul>
        {directions?.map(({ description }) => {
          return <li key={Math.random() * 99}>{description}</li>;
        })}
      </ul>
      <br />
      <span>ingredients</span>
      <br />
      <ul>
        {ingredients?.map(({ product, quantity, unitOfMeasurement }) => {
          return (
            <li
              key={Math.random() * 99}
            >{`${product} - ${quantity} - ${unitOfMeasurement}`}</li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecipePage;

export const getStaticPaths: GetStaticPaths = async (context) => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id ?? "0";
  const recipe = getRecipeMock();
  return { props: { recipe }, revalidate: 1 };
};
