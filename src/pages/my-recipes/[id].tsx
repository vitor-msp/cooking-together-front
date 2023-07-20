import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getRecipeMock, getRecipesMock } from "@/src/mocks/recipes";
import Link from "next/link";
import Comments from "@/src/components/Comments";
import { Recipe } from "@/src/domain/Recipe";

type MyRecipePageProps = {
  recipe: Recipe;
};

const MyRecipePage: NextPage<MyRecipePageProps> = ({ recipe }) => {
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

  const saveRecipe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div>
      <Link href={"/my-recipes"}>my recipes</Link>

      <form action="" onSubmit={saveRecipe}>
        <label htmlFor="">
          recipe id
          <input type="text" name="" id="" value={id} disabled={true} />
        </label>
        <br />
        <label htmlFor="">
          servings
          <input type="number" name="" id="" value={servings} disabled={true} />
        </label>
        <br />
        <label htmlFor="">
          title
          <input type="text" name="" id="" value={title} disabled={true} />
        </label>
        <br />
        <label htmlFor="">
          totalTimeInMinutes
          <input
            type="number"
            name=""
            id=""
            value={totalTimeInMinutes}
            disabled={true}
          />
        </label>
        <br />
        <label htmlFor="">
          updatedAt
          <input type="text" name="" id="" value={updatedAt} disabled={true} />
        </label>
        <br />
        <label htmlFor="">
          createdAt
          <input type="text" name="" id="" value={createdAt} disabled={true} />
        </label>
        <br />
        <textarea name="" id="" cols={30} rows={10}>
          {description}
        </textarea>
        <hr />
        <label htmlFor="">
          user id
          <input type="text" name="" id="" value={user?.id} disabled={true} />
        </label>
        <br />
        <label htmlFor="">
          user name
          <input type="text" name="" id="" value={user?.name} disabled={true} />
        </label>
        <br />
        <div>
          <h4>directions</h4>
          <ul>
            {directions?.map(({ description }) => {
              return <li key={Math.random() * 99}>{description}</li>;
            })}
          </ul>
        </div>
        <div>
          <h4>ingredients</h4>
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
        <button type="submit">Save</button>
      </form>
      <Comments recipeId={id ?? ""} />
    </div>
  );
};

export default MyRecipePage;

export const getStaticPaths: GetStaticPaths = async (context) => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id ?? "0";
  const recipe = getRecipeMock();
  return { props: { recipe }, revalidate: 1 };
};
