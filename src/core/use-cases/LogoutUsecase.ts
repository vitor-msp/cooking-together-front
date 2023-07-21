import { CurrentUser } from "../domain/User";
import { IHttpGate } from "../gateways/IHttpGate";
import { IUserDataRepo } from "../gateways/IUserDataRepo";

export class LogoutUsecase {
  constructor(
    private readonly userApi: IHttpGate,
    private readonly userDataRepo: IUserDataRepo
  ) {}

  async execute(): Promise<boolean> {
    try {
      const user = await this.userDataRepo.get();
      if (!user) return false;
      await this.userApi.logout(user);
      await this.userDataRepo.clean();
      return true;
    } catch (error) {
      return false;
    }
  }
}
