import { Recipe } from "../domain/Recipe";
import { IHttpGate } from "../gateways/IHttpGate";
import { IUserDataRepo } from "../gateways/IUserDataRepo";

export class GetRecipesUsecase {
  constructor(
    private readonly recipesApi: IHttpGate,
    private readonly userDataRepo: IUserDataRepo
  ) {}

  async execute(): Promise<Recipe[]> {
    try {
      const user = await this.userDataRepo.get();
      if (!user || !user.token || !user.tokenType) return [];
      return await this.recipesApi.getRecipes(user.token, user.tokenType);
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
