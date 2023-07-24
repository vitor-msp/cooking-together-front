import React, { useEffect, useState } from "react";
import { Direction } from "../core/domain/Recipe";

export type DirectionsProps = {
  directions: Direction[];
  updateDirections: (newDirecionts: Direction[]) => void;
};

const Directions: React.FC<DirectionsProps> = ({
  directions,
  updateDirections,
}) => {
  const [currentDirections, setCurrentDirections] =
    useState<Direction[]>(directions);

  useEffect(() => {
    updateDirections(currentDirections);
  }, [currentDirections]);

  const addDirection = () => {
    setCurrentDirections((d) => [...d, { description: "" }]);
  };

  const changeDirection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDirections: Direction[] = Object.assign([], currentDirections);
    const index = +event.target.id;
    newDirections[index].description = event.target.value;
    setCurrentDirections([...newDirections]);
  };

  const deleteDirection = (indexToDelete: number) => {
    const newDirections = currentDirections.filter(
      (_, index) => index !== indexToDelete
    );
    setCurrentDirections(() => [...newDirections]);
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
                name=""
                id={index.toString()}
                value={description}
                onChange={changeDirection}
              />
              <button type="button" onClick={() => deleteDirection(index)}>
                x
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Directions;
