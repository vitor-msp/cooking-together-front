import { Recipe } from "../domain/Recipe";
import { CurrentUser } from "../domain/User";

export interface IHttpGate {
  addUser(user: CurrentUser): Promise<void>;
  getUser(user: CurrentUser): Promise<CurrentUser>;
  login(
    user: CurrentUser
  ): Promise<{ token: string; tokenType: string; userId: string }>;
  logout(user: CurrentUser): Promise<void>;
  getRecipes(user: CurrentUser): Promise<Recipe[]>;
  getRecipe(id: string, user: CurrentUser): Promise<Recipe>;
  getMyRecipes(user: CurrentUser): Promise<Recipe[]>;
  addRecipe(recipe: Recipe, user: CurrentUser): Promise<void>;
  editRecipe(recipe: Recipe, user: CurrentUser): Promise<void>;
}
