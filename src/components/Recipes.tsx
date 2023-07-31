import React from "react";
import { Recipe } from "../core/domain/Recipe";
import Link from "next/link";

type RecipesProps = {
  recipes: Recipe[];
};

const Recipes: React.FC<RecipesProps> = ({ recipes }) => {
  return (
    <div className="">
      <ul>
        {recipes?.map(
          ({ id, servings, title, totalTimeInMinutes, updatedAt }) => {
            return (
              <li key={id}>
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

export default Recipes;
