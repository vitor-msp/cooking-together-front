import { Recipe } from "../domain/Recipe";
import { CurrentUser } from "../domain/User";
import { IHttpGate } from "../gateways/IHttpGate";

export class GetRecipeUsecase {
  constructor(private readonly recipesApi: IHttpGate) {}

  async execute(id: string, user: CurrentUser): Promise<Recipe> {
    try {
      if (!user || !user.token || !user.tokenType) return {};
      const { token, tokenType } = user;
      return await this.recipesApi.getRecipe(id, token, tokenType);
    } catch (error) {
      return {};
    }
  }
}
