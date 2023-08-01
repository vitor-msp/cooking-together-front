import React from "react";
import { Direction } from "../core/domain/Recipe";

export type DirectionsProps = {
  directions: Direction[];
  updateDirections: (newDirections: Direction[]) => void;
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
    <div className="flex flex-wrap w-full">
      <div className="w-full md:w-3/12">
        <div className="flex gap-2 justify-center md:justify-end items-start mt-1 pr-2 py-1 border border-orange-500 rounded-md">
          <h4 className="text-xl text-center text-orange-600 mt-1">
            directions
          </h4>
          <button
            type="button"
            onClick={addDirection}
            className="bg-orange-500 p-1 text-xl hover:text-orange-500 hover:bg-orange-200 text-gray-100 w-10 rounded-md transition-all"
          >
            +
          </button>
        </div>
      </div>
      <div className="w-full md:w-9/12 pt-2 md:pt-1 md:pl-2 pb-1">
        <ul className="p-2 border border-orange-500 rounded-md">
          {directions.map(({ description }, index) => {
            return (
              <li
                key={index}
                className="flex flex-col sm:flex-row justify-between my-2"
              >
                <input
                  type="text"
                  id={index.toString()}
                  value={description}
                  onChange={changeDirection}
                  disabled={!canEdit}
                  className="grow p-1 rounded-md hover:bg-orange-100 mr-2"
                  placeholder="description..."
                />
                {canEdit && (
                  <button
                    type="button"
                    onClick={() => {
                      deleteDirection(index);
                    }}
                    className="bg-orange-500 p-1 text-xl hover:text-orange-500 hover:bg-orange-200 text-gray-100 w-10 rounded-md transition-all mt-1 sm:mt-0 self-end"
                  >
                    x
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Directions;
