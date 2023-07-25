import React, { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Recipe } from "@/src/core/domain/Recipe";
import Link from "next/link";
import { getRecipesUsecase } from "@/src/factory";
import { Cookie } from "@/src/utils/Cookie";
import { Query } from "@/src/utils/Query";
import { useRouter } from "next/router";

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
    <div>
      <h1>RecipesPage</h1>

      <form action="" onSubmit={onSubmit}>
        <br />
        <label htmlFor="">
          title
          <input
            type="text"
            name="title"
            value={currentSearch.title ?? ""}
            onChange={onChangeField}
          />
        </label>
        <br />
        <label htmlFor="">
          servingsFrom
          <input
            type="number"
            name="servingsFrom"
            value={currentSearch.servingsFrom ?? ""}
            onChange={onChangeField}
          />
        </label>
        <br />
        <label htmlFor="">
          servingsTo
          <input
            type="number"
            name="servingsTo"
            value={currentSearch.servingsTo ?? ""}
            onChange={onChangeField}
          />
        </label>
        <br />
        <label htmlFor="">
          totalTimeInMinutesFrom
          <input
            type="number"
            name="totalTimeInMinutesFrom"
            value={currentSearch.totalTimeInMinutesFrom ?? ""}
            onChange={onChangeField}
          />
        </label>
        <br />
        <label htmlFor="">
          totalTimeInMinutesTo
          <input
            type="number"
            name="totalTimeInMinutesTo"
            value={currentSearch.totalTimeInMinutesTo ?? ""}
            onChange={onChangeField}
          />
        </label>
        <br />
        <label htmlFor="">
          ingredients
          <input
            type="text"
            name="ingredients"
            value={currentSearch.ingredients ?? ""}
            onChange={onChangeField}
          />
        </label>
        <br />
        <button type="submit">search</button>
      </form>

      <ul>
        {recipes?.map(
          ({ id, servings, title, totalTimeInMinutes, updatedAt }) => {
            return (
              <li key={id}>
                {/* passHref */}
                <Link href={`/recipes/${id}`}>
                  {`${servings} ${title} ${totalTimeInMinutes} ${updatedAt}`}
                </Link>
              </li>
            );
          }
        )}
      </ul>
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
