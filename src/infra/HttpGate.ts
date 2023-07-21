import { AxiosInstance } from "axios";
import { CurrentUser } from "../core/domain/User";
import { IHttpGate } from "../core/gateways/IHttpGate";
import { Recipe } from "../core/domain/Recipe";

export class HttpGate implements IHttpGate {
  constructor(private readonly api: AxiosInstance) {}

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
      .get<Recipe[]>(`/recipes`, {
        headers: { Authorization: `${tokenType} ${token}` },
      })
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to get recipes");
      });
    console.log(recipes);
    return recipes;
  }
}
