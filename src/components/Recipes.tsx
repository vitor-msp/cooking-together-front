import React from "react";
import Link from "next/link";
import { Recipe } from "../core/domain/Recipe";

type RecipesProps = {
  recipes: Recipe[];
  publicView: boolean;
};

const Recipes: React.FC<RecipesProps> = ({ recipes, publicView }) => {
  return (
    <div className="mt-3 w-10/12">
      <ul>
        {recipes?.map(
          ({ id, servings, title, totalTimeInMinutes, updatedAt }) => {
            const formattedUpdatedAt = updatedAt
              ? new Date(updatedAt).toDateString().toLowerCase()
              : "-";
            return (
              <li
                key={id}
                className="my-2 p-3 rounded-md hover:bg-orange-200 w-full"
              >
                <Link href={`/${publicView ? "recipes" : "my-recipes"}/${id}`}>
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <span className="text-3xl text-center text-orange-600">
                        {title}
                      </span>
                    </div>
                    <div className="flex flex-col items-end sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                      <div>
                        <strong className="mr-2">updated at:</strong>
                        <span>{formattedUpdatedAt}</span>
                      </div>
                      <div>
                        <strong className="mr-2">servings:</strong>
                        <span>{servings}</span>
                      </div>
                      <div>
                        <strong className="mr-2">done in:</strong>
                        <span>{totalTimeInMinutes} min</span>
                      </div>
                    </div>
                  </div>
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
