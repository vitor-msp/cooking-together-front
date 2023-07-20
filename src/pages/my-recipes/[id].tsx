import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getRecipeMock, getRecipesMock } from "@/src/mocks/recipes";
import Link from "next/link";
import Comments from "@/src/components/Comments";
import { Recipe } from "@/src/domain/Recipe";

type MyRecipePageProps = {
  recipe: Recipe;
};

const defaultRecipe: Recipe = {
  totalTimeInMinutes: 0,
  servings: 0,
  ingredients: [],
  directions: [],
  description: "",
  updatedAt: "",
  createdAt: "",
};

const MyRecipePage: NextPage<MyRecipePageProps> = ({ recipe }) => {
  const [currentRecipe, setCurrentRecipe] = useState<Recipe>(defaultRecipe);
  const [canEdit, setCanEdit] = useState<boolean>(false);

  useEffect(() => {
    setCurrentRecipe({ ...recipe });
  }, []);

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
          <input
            type="text"
            name=""
            id=""
            value={currentRecipe.id}
            disabled={!canEdit}
          />
        </label>
        <br />
        <label htmlFor="">
          servings
          <input
            type="number"
            name=""
            id=""
            value={currentRecipe.servings}
            disabled={!canEdit}
          />
        </label>
        <br />
        <label htmlFor="">
          title
          <input
            type="text"
            name=""
            id=""
            value={currentRecipe.title}
            disabled={!canEdit}
          />
        </label>
        <br />
        <label htmlFor="">
          totalTimeInMinutes
          <input
            type="number"
            name=""
            id=""
            value={currentRecipe.totalTimeInMinutes}
            disabled={!canEdit}
          />
        </label>
        <br />
        <label htmlFor="">
          updatedAt
          <input
            type="text"
            name=""
            id=""
            value={currentRecipe.updatedAt}
            disabled={!canEdit}
          />
        </label>
        <br />
        <label htmlFor="">
          createdAt
          <input
            type="text"
            name=""
            id=""
            value={currentRecipe.createdAt}
            disabled={!canEdit}
          />
        </label>
        <br />
        <textarea name="" id="" cols={30} rows={10} disabled={!canEdit}>
          {currentRecipe.description}
        </textarea>
        <hr />
        <label htmlFor="">
          user id
          <input
            type="text"
            name=""
            id=""
            value={currentRecipe.user?.id}
            disabled={!canEdit}
          />
        </label>
        <br />
        <label htmlFor="">
          user name
          <input
            type="text"
            name=""
            id=""
            value={currentRecipe.user?.name}
            disabled={!canEdit}
          />
        </label>
        <br />
        <div>
          <h4>directions</h4>
          <ul>
            {currentRecipe.directions?.map(({ description }) => {
              return <li key={Math.random() * 99}>{description}</li>;
            })}
          </ul>
        </div>
        <div>
          <h4>ingredients</h4>
          <ul>
            {currentRecipe.ingredients?.map(
              ({ product, quantity, unitOfMeasurement }) => {
                return (
                  <li
                    key={Math.random() * 99}
                  >{`${product} - ${quantity} - ${unitOfMeasurement}`}</li>
                );
              }
            )}
          </ul>
        </div>
        {canEdit ? (
          <>
            <button type="button" onClick={() => setCanEdit(false)}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </>
        ) : (
          <button type="button" onClick={() => setCanEdit(true)}>
            Edit
          </button>
        )}
      </form>
      <Comments recipeId={currentRecipe.id ?? ""} />
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
