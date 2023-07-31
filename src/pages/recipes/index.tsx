import React, { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Recipe } from "@/src/core/domain/Recipe";
import Link from "next/link";
import { getRecipesUsecase } from "@/src/factory";
import { Cookie } from "@/src/utils/Cookie";
import { Query } from "@/src/utils/Query";
import { useRouter } from "next/router";
import Recipes from "@/src/components/Recipes";

type RecipesPageProps = {
  recipes: Recipe[];
};

export type SearchRecipesType = {
  title: string | null;
  servingsFrom: number | null;
  servingsTo: number | null;
  totalTimeInMinutesFrom: number | null;
  totalTimeInMinutesTo: number | null;
  ingredients: string | null;
  userId: string | null;
};

const defaultSearch: SearchRecipesType = {
  title: null,
  servingsFrom: null,
  servingsTo: null,
  totalTimeInMinutesFrom: null,
  totalTimeInMinutesTo: null,
  ingredients: null,
  userId: null,
};

const RecipesPage: NextPage<RecipesPageProps> = ({ recipes }) => {
  const [currentSearch, setCurrentSearch] =
    useState<SearchRecipesType>(defaultSearch);
  const router = useRouter();

  const onChangeField = (event: any) => {
    const newSearch = Object.assign(
      {},
      {
        ...currentSearch,
        [event.target.name]: event.target.value,
      }
    );
    setCurrentSearch(newSearch);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const query = Query.prepareQuery(currentSearch);
    router.push(`/recipes?${query}`);
  };

  return (
    <div className="flex flex-col items-center justify-start self-start w-screen">
      <div className="default-form">
        <form action="" onSubmit={onSubmit}>
          <div className="flex flex-col md:flex-row gap-2">
            <fieldset className="border border-orange-500 mb-1 p-3">
              <div>
                <label htmlFor="title">title contains</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="p-1"
                  value={currentSearch.title ?? ""}
                  onChange={onChangeField}
                />
              </div>
              <div>
                <label htmlFor="servingsFrom">servings from</label>
                <input
                  type="number"
                  name="servingsFrom"
                  id="servingsFrom"
                  className="p-1"
                  value={currentSearch.servingsFrom ?? ""}
                  onChange={onChangeField}
                />
              </div>
              <div>
                <label htmlFor="servingsTo">servings to</label>
                <input
                  type="number"
                  name="servingsTo"
                  id="servingsTo"
                  className="p-1"
                  value={currentSearch.servingsTo ?? ""}
                  onChange={onChangeField}
                />
              </div>
            </fieldset>
            <fieldset className="border border-orange-500 mb-1 p-3">
              <div>
                <label htmlFor="totalTimeInMinutesFrom">
                  {"total time from (min)"}
                </label>
                <input
                  type="number"
                  name="totalTimeInMinutesFrom"
                  id="totalTimeInMinutesFrom"
                  className="p-1"
                  value={currentSearch.totalTimeInMinutesFrom ?? ""}
                  onChange={onChangeField}
                />
              </div>
              <div>
                <label htmlFor="totalTimeInMinutesTo">
                  {" total time to (min)"}
                </label>
                <input
                  type="number"
                  name="totalTimeInMinutesTo"
                  id="totalTimeInMinutesTo"
                  className="p-1"
                  value={currentSearch.totalTimeInMinutesTo ?? ""}
                  onChange={onChangeField}
                />
              </div>
              <div>
                <label htmlFor="ingredients">ingredients contains</label>
                <input
                  type="text"
                  name="ingredients"
                  id="ingredients"
                  className="p-1"
                  value={currentSearch.ingredients ?? ""}
                  onChange={onChangeField}
                />
              </div>
            </fieldset>
          </div>
          <button
            type="submit"
            className="bg-orange-500 p-1 text-xl hover:text-orange-500 hover:bg-orange-200 text-gray-100"
          >
            search for recipes
          </button>
        </form>
      </div>
      <Recipes recipes={recipes} publicView={true} />
    </div>
  );
};

export default RecipesPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = Query.getQuery(context.req.url);
  const recipes = await getRecipesUsecase.execute(
    Cookie.getUser(context.req.cookies),
    query
  );
  return {
    props: {
      recipes,
    },
  };
};
