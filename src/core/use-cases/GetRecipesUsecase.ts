import { Recipe } from "../domain/Recipe";
import { CurrentUser } from "../domain/User";
import { IHttpGate } from "../gateways/IHttpGate";

export class GetRecipesUsecase {
  constructor(private readonly recipesApi: IHttpGate) {}

  async execute(user: CurrentUser, query?: string): Promise<Recipe[]> {
    try {
      const recipes = await this.recipesApi.getRecipes(user, query);
      return recipes;
    } catch (error) {
      return [];
    }
  }
}
