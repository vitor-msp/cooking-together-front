import React, { useContext, useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Comments from "@/src/components/Comments";
import { Direction, Ingredient, Recipe } from "@/src/core/domain/Recipe";
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
import Ingredients from "@/src/components/Ingredients";

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

  const updateIngredients = (newIngredients: Ingredient[]) => {
    setCurrentRecipe((r) => {
      return { ...r, ingredients: [...newIngredients] };
    });
  };

  return (
    <div>
      <Link href={"/my-recipes"}>my recipes</Link>
      <button type="button" onClick={deleteRecipe}>
        delete
      </button>
      <div className="default-form">
        <form action="" onSubmit={saveRecipe}>
          <div className="flex flex-col md:flex-row gap-2">
            <fieldset className="border border-orange-500 mb-1 p-3">
              {/* <div>
              <label htmlFor="id">recipe id</label>
              <input
                onChange={onChangeField}
                type="text"
                name="id"
                id="id"
                className="p-1"
                value={currentRecipe.id}
                disabled={!canEdit}
              />
            </div> */}
              <div>
                <label htmlFor="title">title</label>
                <input
                  onChange={onChangeField}
                  type="text"
                  name="title"
                  id="title"
                  className="p-1"
                  value={currentRecipe.title}
                  disabled={!canEdit}
                />
              </div>
              <div>
                <label htmlFor="servings">servings</label>
                <input
                  onChange={onChangeField}
                  type="number"
                  name="servings"
                  id="servings"
                  className="p-1"
                  value={currentRecipe.servings}
                  disabled={!canEdit}
                />
              </div>
              <div>
                <label htmlFor="totalTimeInMinutes">{"total time (min)"}</label>
                <input
                  onChange={onChangeField}
                  type="number"
                  name="totalTimeInMinutes"
                  id="totalTimeInMinutes"
                  className="p-1"
                  value={currentRecipe.totalTimeInMinutes}
                  disabled={!canEdit}
                />
              </div>
              {!isAdd && (
                <>
                  <div>
                    <label htmlFor="updatedAt">updated at</label>
                    <input
                      onChange={onChangeField}
                      type="text"
                      name="updatedAt"
                      id="updatedAt"
                      className="p-1"
                      value={currentRecipe.updatedAt}
                      disabled={true}
                    />
                  </div>
                  <div>
                    <label htmlFor="createdAt">created at</label>
                    <input
                      onChange={onChangeField}
                      type="text"
                      name="createdAt"
                      id="createdAt"
                      className="p-1"
                      value={currentRecipe.createdAt}
                      disabled={true}
                    />
                  </div>
                </>
              )}
            </fieldset>
            <fieldset className="border border-orange-500 mb-1 p-3">
              <div>
                <label htmlFor="description">description</label>
                <textarea
                  name="description"
                  id="description"
                  cols={30}
                  rows={10}
                  disabled={!canEdit}
                  onChange={onChangeField}
                  value={currentRecipe.description}
                />
              </div>
            </fieldset>
          </div>
          <Directions
            directions={currentRecipe.directions ?? []}
            updateDirections={updateDirections}
            canEdit={canEdit}
          />
          <Ingredients
            ingredients={currentRecipe.ingredients ?? []}
            updateIngredients={updateIngredients}
            canEdit={canEdit}
          />
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
      </div>
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
