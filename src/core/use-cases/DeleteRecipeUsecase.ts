import { Recipe } from "../domain/Recipe";
import { CurrentUser } from "../domain/User";
import { IHttpGate } from "../gateways/IHttpGate";

export class DeleteRecipeUsecase {
  constructor(private readonly recipesApi: IHttpGate) {}

  async execute(recipe: Recipe, user: CurrentUser): Promise<boolean> {
    try {
      await this.recipesApi.deleteRecipe(recipe, user);
      return true;
    } catch (error) {
      return false;
    }
  }
}
