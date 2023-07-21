import { Recipe } from "../domain/Recipe";
import { CurrentUser } from "../domain/User";
import { IHttpGate } from "../gateways/IHttpGate";

export class EditRecipeUsecase {
  constructor(private readonly recipesApi: IHttpGate) {}

  async execute(recipe: Recipe, user: CurrentUser): Promise<boolean> {
    try {
      await this.recipesApi.editRecipe(recipe, user);
      return true;
    } catch () {
      return false;
    }
  }
}
