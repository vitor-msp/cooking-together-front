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
    <div>
      <h4>ingredients</h4>
      <button type="button" onClick={addIngredient}>
        +
      </button>
      <ul>
        {ingredients.map(({ product, quantity, unitOfMeasurement }, index) => {
          return (
            <li key={index}>
              <input
                type="text"
                id={index.toString()}
                name={"product"}
                value={product}
                onChange={changeIngredient}
                disabled={!canEdit}
              />
              <input
                type="number"
                id={index.toString()}
                name={"quantity"}
                value={quantity}
                onChange={changeIngredient}
                disabled={!canEdit}
              />
              <input
                type="text"
                id={index.toString()}
                name={"unitOfMeasurement"}
                value={unitOfMeasurement}
                onChange={changeIngredient}
                disabled={!canEdit}
              />
              {canEdit && (
                <button
                  type="button"
                  onClick={() => {
                    deleteIngredient(index);
                  }}
                >
                  x
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Ingredients;
