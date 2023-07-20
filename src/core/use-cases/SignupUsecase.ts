import { CurrentUser } from "../domain/User";
import { IHttpGate } from "../gateways/IHttpGate";

export class SignupUsecase {
  constructor(private readonly userApi: IHttpGate) {}

  async execute(user: CurrentUser): Promise<boolean> {
    try {
      await this.userApi.postUser(user);
      return true;
    } catch (error) {
      return false;
    }
  }
}
