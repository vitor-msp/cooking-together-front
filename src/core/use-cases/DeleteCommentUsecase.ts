import { Comment } from "../domain/Comment";
import { CurrentUser } from "../domain/User";
import { IHttpGate } from "../gateways/IHttpGate";

export class DeleteCommentUsecase {
  constructor(private readonly commentsApi: IHttpGate) {}

  async execute(comment: Comment, user: CurrentUser): Promise<boolean> {
    try {
      await this.commentsApi.deleteComment(comment, user);
      return true;
    } catch (error) {
      return false;
    }
  }
}
