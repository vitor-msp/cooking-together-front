import { Recipe } from "../domain/Recipe";
import { CurrentUser } from "../domain/User";

export interface IHttpGate {
  postUser(user: CurrentUser): Promise<void>;
  login(user: CurrentUser): Promise<{ token: string; tokenType: string }>;
  getRecipes(token: string, tokenType: string): Promise<Recipe[]>;
  getRecipe(id: string, token: string, tokenType: string): Promise<Recipe>;
}
