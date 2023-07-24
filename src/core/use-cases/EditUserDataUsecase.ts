import { CurrentUser } from "../domain/User";
import { IHttpGate } from "../gateways/IHttpGate";

export class EditUserDataUsecase {
  constructor(private readonly userApi: IHttpGate) {}

  async execute(user: CurrentUser): Promise<boolean> {
    try {
      await this.userApi.editUser(user);
      return true;
    } catch (error) {
      return false;
    }
  }
}
