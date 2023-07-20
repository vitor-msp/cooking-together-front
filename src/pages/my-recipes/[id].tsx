import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getRecipeMock, getRecipesMock } from "@/src/mocks/recipes";
import Link from "next/link";
import Comments from "@/src/components/Comments";
import { Recipe } from "@/src/domain/Recipe";
import { useRouter } from "next/router";

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
  const router = useRouter();

  useEffect(() => {
    setCurrentRecipe({ ...recipe });
  }, []);

  const saveRecipe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    router.push(`/my-recipes`);
  };

  const onChangeField = (event: any) => {
    const newRecipe = Object.assign(
      {},
      {
        ...currentRecipe,
        [event.target.name]: event.target.value,
      }
    );
    setCurrentRecipe(newRecipe);
  };

  const cancelEdit = () => {
    setCanEdit(false);
    setCurrentRecipe({ ...recipe });
  };

  return (
    <div>
      <Link href={"/my-recipes"}>my recipes</Link>

      <form action="" onSubmit={saveRecipe}>
        <label htmlFor="">
          recipe id
          <input
            onChange={onChangeField}
            type="text"
            name="id"
            value={currentRecipe.id}
            disabled={!canEdit}
          />
        </label>
        <br />
        <label htmlFor="">
          servings
          <input
            onChange={onChangeField}
            type="number"
            name="servings"
            value={currentRecipe.servings}
            disabled={!canEdit}
          />
        </label>
        <br />
        <label htmlFor="">
          title
          <input
            onChange={onChangeField}
            type="text"
            name="title"
            value={currentRecipe.title}
            disabled={!canEdit}
          />
        </label>
        <br />
        <label htmlFor="">
          totalTimeInMinutes
          <input
            onChange={onChangeField}
            type="number"
            name="totalTimeInMinutes"
            value={currentRecipe.totalTimeInMinutes}
            disabled={!canEdit}
          />
        </label>
        <br />
        <label htmlFor="">
          updatedAt
          <input
            onChange={onChangeField}
            type="text"
            name="updatedAt"
            value={currentRecipe.updatedAt}
            disabled={!canEdit}
          />
        </label>
        <br />
        <label htmlFor="">
          createdAt
          <input
            onChange={onChangeField}
            type="text"
            name="createdAt"
            value={currentRecipe.createdAt}
            disabled={!canEdit}
          />
        </label>
        <br />
        <textarea
          name="description"
          id=""
          cols={30}
          rows={10}
          disabled={!canEdit}
          onChange={onChangeField}
        >
          {currentRecipe.description}
        </textarea>
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
            <button type="button" onClick={cancelEdit}>
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
