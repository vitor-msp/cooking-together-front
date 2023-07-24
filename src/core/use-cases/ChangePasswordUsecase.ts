import { ChangePassword } from "../domain/ChangePassword";
import { CurrentUser } from "../domain/User";
import { IHttpGate } from "../gateways/IHttpGate";

export class ChangePasswordUsecase {
  constructor(private readonly userApi: IHttpGate) {}

  async execute(user: CurrentUser, data: ChangePassword): Promise<boolean> {
    try {
      await this.userApi.changePassword(user, data);
      return true;
    } catch (error) {
      return false;
    }
  }
}
