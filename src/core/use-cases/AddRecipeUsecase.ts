import { Recipe } from "../domain/Recipe";
import { CurrentUser } from "../domain/User";
import { IHttpGate } from "../gateways/IHttpGate";

export class AddRecipeUsecase {
  constructor(private readonly recipesApi: IHttpGate) {}

  async execute(recipe: Recipe, user: CurrentUser): Promise<boolean> {
    try {
      console.log(recipe);
      await this.recipesApi.postRecipe(recipe, user);
      return true;
    } catch (error) {
      return false;
    }
  }
}
