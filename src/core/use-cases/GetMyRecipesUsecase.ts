import { Recipe } from "../domain/Recipe";
import { CurrentUser } from "../domain/User";
import { IHttpGate } from "../gateways/IHttpGate";

export class GetMyRecipesUsecase {
  constructor(private readonly recipesApi: IHttpGate) {}

  async execute(user: CurrentUser): Promise<Recipe[]> {
    try {
      const myRecipes = await this.recipesApi.getMyRecipes(user);
      return myRecipes;
    } catch (error) {
      return [];
    }
  }
}
