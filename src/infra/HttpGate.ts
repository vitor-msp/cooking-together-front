import { AxiosInstance } from "axios";
import { CurrentUser } from "../core/domain/User";
import { IHttpGate } from "../core/gateways/IHttpGate";
import { Recipe } from "../core/domain/Recipe";

export class HttpGate implements IHttpGate {
  constructor(private readonly api: AxiosInstance) {}

  private getAuthHeader(user: CurrentUser) {
    const { token, tokenType } = user;
    if (!token || !tokenType) throw new Error("missing token");
    return {
      headers: { Authorization: `${tokenType} ${token}` },
    };
  }

  async postUser(user: CurrentUser): Promise<void> {
    const res = await this.api
      .post(`/users`, user)
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to register");
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

  async postRecipe(recipe: Recipe, user: CurrentUser): Promise<void> {
    console.log(recipe);
    await this.api
      .post(`/recipes`, recipe, this.getAuthHeader(user))
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to register");
      });
  }
}
