import { AxiosInstance } from "axios";
import { CurrentUser } from "../core/domain/User";
import { IHttpGate } from "../core/gateways/IHttpGate";
import { Recipe } from "../core/domain/Recipe";

export class HttpGate implements IHttpGate {
  constructor(private readonly api: AxiosInstance) {}

  private getAuthHeader(token: string, tokenType: string) {
    return {
      headers: { Authorization: `${tokenType} ${token}` },
    };
  }

  async postUser(user: CurrentUser): Promise<void> {
    const res = await this.api
      .post(`/users`, user)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error("error to register");
      });
  }

  async login(
    user: CurrentUser
  ): Promise<{ token: string; tokenType: string }> {
    const { token, type } = await this.api
      .post<{ token: string; type: string }>(`/login`, user)
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to authenticate");
      });
    return { token, tokenType: type };
  }

  async getRecipes(token: string, tokenType: string): Promise<Recipe[]> {
    const recipes = await this.api
      .get<Recipe[]>(`/recipes`, this.getAuthHeader(token, tokenType))
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to get recipes");
      });
    return recipes;
  }

  async getRecipe(
    id: string,
    token: string,
    tokenType: string
  ): Promise<Recipe> {
    const recipe = await this.api
      .get<Recipe>(`/recipes/${id}`, this.getAuthHeader(token, tokenType))
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to get recipe");
      });
    return recipe;
  }
}
