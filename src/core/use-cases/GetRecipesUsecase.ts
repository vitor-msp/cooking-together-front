import { Recipe } from "../domain/Recipe";
import { CurrentUser } from "../domain/User";
import { IHttpGate } from "../gateways/IHttpGate";

export class GetRecipesUsecase {
  constructor(private readonly recipesApi: IHttpGate) {}

  async execute(user: CurrentUser): Promise<Recipe[]> {
    try {
      return await this.recipesApi.getRecipes(user);
    } catch (error) {
      return [];
    }
  }
}
