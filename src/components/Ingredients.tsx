import React from "react";
import { Ingredient } from "../core/domain/Recipe";

export type IngredientsProps = {
  ingredients: Ingredient[];
  updateIngredients: (newIngredients: Ingredient[]) => void;
  canEdit: boolean;
};

const Ingredients: React.FC<IngredientsProps> = ({
  ingredients,
  updateIngredients,
  canEdit,
}) => {
  const addIngredient = () => {
    updateIngredients([
      ...ingredients,
      { product: "", quantity: 0, unitOfMeasurement: "" },
    ]);
  };

  const changeIngredient = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIngredients: Ingredient[] = Object.assign([], ingredients);
    const index = +event.target.id;
    newIngredients[index] = {
      ...newIngredients[index],
      [event.target.name]:
        event.target.name.localeCompare("quantity") === 0
          ? +event.target.value
          : event.target.value,
    };
    updateIngredients(newIngredients);
  };

  const deleteIngredient = (indexToDelete: number) => {
    const newIngredients = ingredients.filter(
      (_, index) => index !== indexToDelete
    );
    updateIngredients(newIngredients);
  };

  return (
    <div className="flex flex-wrap w-full">
      <div className="w-full md:w-3/12">
        <div className="flex gap-2 justify-center md:justify-end items-start mt-1 pr-2 py-1 border border-orange-500 rounded-md">
          <h4 className="text-xl text-center text-orange-600 mt-1">
            ingredients
          </h4>
          <button
            type="button"
            onClick={addIngredient}
            className="bg-orange-500 p-1 text-xl hover:text-orange-500 hover:bg-orange-200 text-gray-100 w-10 rounded-md transition-all"
          >
            +
          </button>
        </div>
      </div>
      <div className="w-full md:w-9/12 p-1">
        <ul className="p-2 border border-orange-500 rounded-md">
          {ingredients.map(
            ({ product, quantity, unitOfMeasurement }, index) => {
              return (
                <li key={index} className="flex flex-col gap-2 my-2">
                  <div className="w-full">
                    <input
                      type="text"
                      id={index.toString()}
                      name={"product"}
                      value={product}
                      onChange={changeIngredient}
                      disabled={!canEdit}
                      className="p-1 rounded-md hover:bg-orange-100 w-full"
                      placeholder="product..."
                    />
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <label>
                        <span>qtt</span>
                        <input
                          type="number"
                          id={index.toString()}
                          name={"quantity"}
                          value={quantity}
                          onChange={changeIngredient}
                          disabled={!canEdit}
                          className="p-1 rounded-md hover:bg-orange-100 w-14 ml-2"
                          placeholder="quantity..."
                        />
                      </label>
                      <input
                        type="text"
                        id={index.toString()}
                        name={"unitOfMeasurement"}
                        value={unitOfMeasurement}
                        onChange={changeIngredient}
                        disabled={!canEdit}
                        className="p-1 rounded-md hover:bg-orange-100 w-14"
                        placeholder="unit..."
                      />
                    </div>
                    {canEdit && (
                      <button
                        type="button"
                        onClick={() => {
                          deleteIngredient(index);
                        }}
                        className="bg-orange-500 p-1 text-xl hover:text-orange-500 hover:bg-orange-200 text-gray-100 w-10 rounded-md transition-all ml-2"
                      >
                        x
                      </button>
                    )}
                  </div>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
};

export default Ingredients;
