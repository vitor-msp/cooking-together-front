import { ChangePassword } from "../domain/ChangePassword";
import { Comment } from "../domain/Comment";
import { Recipe } from "../domain/Recipe";
import { CurrentUser } from "../domain/User";

export interface IHttpGate {
  addUser(user: CurrentUser): Promise<void>;
  getUser(user: CurrentUser): Promise<CurrentUser>;
  editUser(user: CurrentUser): Promise<void>;
  changePassword(user: CurrentUser, data: ChangePassword): Promise<void>;
  login(
    user: CurrentUser
  ): Promise<{ token: string; tokenType: string; userId: string }>;
  logout(user: CurrentUser): Promise<void>;
  getRecipes(user: CurrentUser, query?: string): Promise<Recipe[]>;
  getRecipe(id: string, user: CurrentUser): Promise<Recipe>;
  getMyRecipes(user: CurrentUser): Promise<Recipe[]>;
  addRecipe(recipe: Recipe, user: CurrentUser): Promise<void>;
  editRecipe(recipe: Recipe, user: CurrentUser): Promise<void>;
  deleteRecipe(recipe: Recipe, user: CurrentUser): Promise<void>;
  addComment(comment: Comment, user: CurrentUser): Promise<void>;
  getComments(recipeId: string, user: CurrentUser): Promise<Comment[]>;
  deleteComment(comment: Comment, user: CurrentUser): Promise<void>;
}
