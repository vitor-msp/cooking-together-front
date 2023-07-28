import React from "react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { Recipe } from "@/src/core/domain/Recipe";
import Link from "next/link";
import Comments from "@/src/components/Comments";
import { Cookie } from "@/src/utils/Cookie";
import { Params } from "@/src/utils/Params";
import { getRecipeUsecase } from "@/src/factory";

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

  let directionsCounter = 1;
  let ingredientesCounter = 1;

  return (
    <div className="w-screen">
      <div className="mx-auto w-10/12 pt-4">
        <h1 className="text-center text-orange-600 text-3xl">{title}</h1>
        <div className="flex justify-around">
          <div>
            <strong>servings:</strong>
            <span className="ml-2">{servings}</span>
          </div>
          <div>
            <strong>done in:</strong>
            <span className="ml-2">{`${totalTimeInMinutes} min`}</span>
          </div>
        </div>
        <div className="text-center">
          <strong>posted by:</strong>
          <span className="ml-2">{user?.name}</span>
        </div>
        <div className="flex justify-around">
          <div>
            <strong>updated at:</strong>
            <span className="ml-2">{updatedAt}</span>
          </div>
          <div>
            <strong>created at:</strong>
            <span className="ml-2">{createdAt}</span>
          </div>
        </div>
        <div className="p-2">
          <p>{description}</p>
        </div>
        <div className="flex flex-col justify-center items-center my-4">
          <h4 className="text-center text-orange-600 text-2xl">directions</h4>
          <ul>
            {directions?.map(({ description }) => {
              const currentDirection = directionsCounter++;
              return (
                <li key={currentDirection}>
                  <strong className="text-orange-600">{`${currentDirection} - `}</strong>
                  <span>{description}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center my-4">
          <h4 className="text-center text-orange-600 text-2xl">ingredients</h4>
          <ul>
            {ingredients?.map(({ product, quantity, unitOfMeasurement }) => {
              const currentIngredient = ingredientesCounter++;
              return (
                <li key={currentIngredient}>
                  <strong className="text-orange-600">{`${currentIngredient} - `}</strong>
                  <div className="inline-flex gap-2">
                    <span>{quantity}</span>
                    <span>{unitOfMeasurement}</span>
                    <span>{product}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <Comments recipeId={id ?? ""} />
      </div>
    </div>
  );
};

export default RecipePage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const user = Cookie.getUser(context.req.cookies);
  const id: string = Params.getId(context.params);
  const recipe = await getRecipeUsecase.execute(id, user);
  return { props: { recipe } };
};
