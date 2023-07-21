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
      <br />
      <Comments recipeId={id ?? ""} />
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
