import { Recipe } from "../domain/Recipe";
import { CurrentUser } from "../domain/User";

export interface IHttpGate {
  postUser(user: CurrentUser): Promise<void>;
  login(
    user: CurrentUser
  ): Promise<{ token: string; tokenType: string; userId: string }>;
  logout(user: CurrentUser): Promise<void>;
  getRecipes(user: CurrentUser): Promise<Recipe[]>;
  getRecipe(id: string, user: CurrentUser): Promise<Recipe>;
  getMyRecipes(user: CurrentUser): Promise<Recipe[]>;
}
