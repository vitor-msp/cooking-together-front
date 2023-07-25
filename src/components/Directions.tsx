import React, { useEffect } from "react";
import { Direction } from "../core/domain/Recipe";

export type DirectionsProps = {
  directions: Direction[];
  updateDirections: (newDirecionts: Direction[]) => void;
  canEdit: boolean;
};

const Directions: React.FC<DirectionsProps> = ({
  directions,
  updateDirections,
  canEdit,
}) => {
  const addDirection = () => {
    updateDirections([...directions, { description: "" }]);
  };

  const changeDirection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDirections: Direction[] = Object.assign([], directions);
    const index = +event.target.id;
    newDirections[index].description = event.target.value;
    updateDirections(newDirections);
  };

  const deleteDirection = (indexToDelete: number) => {
    const newDirections = directions.filter(
      (_, index) => index !== indexToDelete
    );
    updateDirections(newDirections);
  };

  return (
    <div>
      <h4>directions</h4>
      <button type="button" onClick={addDirection}>
        +
      </button>
      <ul>
        {directions.map(({ description }, index) => {
          return (
            <li key={index}>
              <input
                type="text"
                id={index.toString()}
                value={description}
                onChange={changeDirection}
                disabled={!canEdit}
              />
              {canEdit && (
                <button
                  type="button"
                  onClick={() => {
                    deleteDirection(index);
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

export default Directions;
