import { Recipe } from "../domain/Recipe";
import { CurrentUser } from "../domain/User";
import { IHttpGate } from "../gateways/IHttpGate";

export class GetRecipeUsecase {
  constructor(private readonly recipesApi: IHttpGate) {}

  async execute(id: string, user: CurrentUser): Promise<Recipe> {
    try {
      const recipe = await this.recipesApi.getRecipe(id, user);
      return recipe;
    } catch (error) {
      return {};
    }
  }
}
