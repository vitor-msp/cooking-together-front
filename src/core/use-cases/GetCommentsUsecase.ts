import { Comment } from "../domain/Comment";
import { CurrentUser } from "../domain/User";
import { IHttpGate } from "../gateways/IHttpGate";

export class GetCommentsUsecase {
  constructor(private readonly commentsApi: IHttpGate) {}

  async execute(recipeId: string, user: CurrentUser): Promise<Comment[]> {
    try {
      const comments = await this.commentsApi.getComments(recipeId, user);
      return comments;
    } catch (error) {
      return [];
    }
  }
}
