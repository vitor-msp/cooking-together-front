import { AxiosInstance } from "axios";
import { CurrentUser } from "../core/domain/User";
import { IHttpGate } from "../core/gateways/IHttpGate";
import { Recipe } from "../core/domain/Recipe";
import { ChangePassword } from "../core/domain/ChangePassword";
import { Comment } from "../core/domain/Comment";

export class HttpGate implements IHttpGate {
  constructor(private readonly api: AxiosInstance) {}

  private getAuthHeader(user: CurrentUser) {
    const { token, tokenType } = user;
    if (!token || !tokenType) throw new Error("missing token");
    return {
      headers: { Authorization: `${tokenType} ${token}` },
    };
  }

  async addUser(user: CurrentUser): Promise<void> {
    const res = await this.api
      .post(`/users`, user)
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to register");
      });
  }

  async getUser(user: CurrentUser): Promise<CurrentUser> {
    const userData = await this.api
      .get<CurrentUser>(`/users/${user.id}`, this.getAuthHeader(user))
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to get user data");
      });
    return userData;
  }

  async editUser(user: CurrentUser): Promise<void> {
    await this.api
      .put(`/users/${user.id}`, user, this.getAuthHeader(user))
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to edit user data");
      });
  }

  async changePassword(user: CurrentUser, data: ChangePassword): Promise<void> {
    await this.api
      .put(`/users/${user.id}/password`, data, this.getAuthHeader(user))
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to change password");
      });
  }

  async login(
    user: CurrentUser
  ): Promise<{ token: string; tokenType: string; userId: string }> {
    const { token, type, userId } = await this.api
      .post<{ token: string; type: string; userId: string }>(`/login`, user)
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to authenticate");
      });
    return { token, tokenType: type, userId };
  }

  async getRecipes(user: CurrentUser): Promise<Recipe[]> {
    const recipes = await this.api
      .get<Recipe[]>(`/recipes`, this.getAuthHeader(user))
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to get recipes");
      });
    return recipes;
  }

  async getRecipe(id: string, user: CurrentUser): Promise<Recipe> {
    const recipe = await this.api
      .get<Recipe>(`/recipes/${id}`, this.getAuthHeader(user))
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to get recipe");
      });
    return recipe;
  }

  async logout(user: CurrentUser): Promise<void> {
    const res = await this.api
      .post(`/logout`, this.getAuthHeader(user))
      .then()
      .catch(() => {
        throw new Error("error to logout");
      });
  }

  async getMyRecipes(user: CurrentUser): Promise<Recipe[]> {
    const { id } = user;
    if (!id) throw new Error("missing id");
    const recipes = await this.api
      .get<Recipe[]>(`/recipes?userId=${id}`, this.getAuthHeader(user))
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to get my recipes");
      });
    return recipes;
  }

  async addRecipe(recipe: Recipe, user: CurrentUser): Promise<void> {
    await this.api
      .post(`/recipes`, recipe, this.getAuthHeader(user))
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to add recipe");
      });
  }

  async editRecipe(recipe: Recipe, user: CurrentUser): Promise<void> {
    await this.api
      .put(`/recipes/${recipe.id}`, recipe, this.getAuthHeader(user))
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to edit recipe");
      });
  }

  async deleteRecipe(recipe: Recipe, user: CurrentUser): Promise<void> {
    await this.api
      .delete(`/recipes/${recipe.id}`, this.getAuthHeader(user))
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to delete recipe");
      });
  }

  async addComment(comment: Comment, user: CurrentUser): Promise<void> {
    await this.api
      .post(
        `/recipes/${comment.recipeId}/comments`,
        comment,
        this.getAuthHeader(user)
      )
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to add comment");
      });
  }

  async getComments(recipeId: string, user: CurrentUser): Promise<Comment[]> {
    const comments = await this.api
      .get<Comment[]>(`/recipes/${recipeId}/comments`, this.getAuthHeader(user))
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to get comments");
      });
    return comments;
  }

  async deleteComment(comment: Comment, user: CurrentUser): Promise<void> {
    await this.api
      .delete(
        `/recipes/${comment.recipeId}/comments/${comment.id}`,
        this.getAuthHeader(user)
      )
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to delete comment");
      });
  }
}
