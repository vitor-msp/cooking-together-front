import React, { useContext, useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Comments from "@/src/components/Comments";
import { Direction, Recipe } from "@/src/core/domain/Recipe";
import { useRouter } from "next/router";
import {
  addRecipeUsecase,
  deleteRecipeUsecase,
  editRecipeUsecase,
  getRecipeUsecase,
} from "@/src/factory";
import { Cookie } from "@/src/utils/Cookie";
import { Params } from "@/src/utils/Params";
import { UserContext } from "@/src/context/UserProvider";
import Directions from "@/src/components/Directions";

type MyRecipePageProps = {
  recipe: Recipe | null;
  isAdd: boolean;
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

const MyRecipePage: NextPage<MyRecipePageProps> = ({ recipe, isAdd }) => {
  const [currentRecipe, setCurrentRecipe] = useState<Recipe>(defaultRecipe);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const router = useRouter();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (isAdd) {
      setCanEdit(true);
      return;
    }
    setCurrentRecipe({
      ...recipe,
      directions: recipe?.directions?.map(({ description }) => {
        return { description };
      }),
    });
  }, []);

  const saveRecipe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const loggedUser = await userContext.getUser();
    if (!loggedUser) return;
    let success = false;
    if (isAdd) {
      success = await addRecipeUsecase.execute(currentRecipe, loggedUser);
    } else {
      success = await editRecipeUsecase.execute(currentRecipe, loggedUser);
    }
    if (!success) {
      alert("error to save recipe");
      return;
    }
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

  const deleteRecipe = async () => {
    const loggedUser = await userContext.getUser();
    if (!loggedUser) return;
    const success = await deleteRecipeUsecase.execute(
      currentRecipe,
      loggedUser
    );
    if (!success) {
      alert("Error to delete recipe!");
      return;
    }
    router.push("/my-recipes");
  };

  const updateDirections = (newDirections: Direction[]) => {
    setCurrentRecipe((r) => {
      return { ...r, directions: [...newDirections] };
    });
  };

  return (
    <div>
      <Link href={"/my-recipes"}>my recipes</Link>

      <button type="button" onClick={deleteRecipe}>
        delete
      </button>

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
          cols={30}
          rows={10}
          disabled={!canEdit}
          onChange={onChangeField}
          value={currentRecipe.description}
        />
        <Directions
          directions={currentRecipe.directions ?? []}
          updateDirections={updateDirections}
          canEdit={canEdit}
        />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = Cookie.getUser(context.req.cookies);
  const id: string = Params.getId(context.params);
  let recipe: Recipe | null = null;
  let isAdd: boolean = true;
  if (id.localeCompare("new") !== 0) {
    recipe = await getRecipeUsecase.execute(id, user);
    isAdd = false;
  }
  return { props: { recipe, isAdd } };
};
