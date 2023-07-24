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
      .catch((error) => {
        console.log(error);
        throw new Error("error to get user data");
      });
    console.log(userData);
    return userData;
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
}
