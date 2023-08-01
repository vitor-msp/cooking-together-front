import { CurrentUser } from "../domain/User";
import { IUserDataRepo } from "../gateways/IUserDataRepo";

export class GetLoggedUserUsecase {
  constructor(private readonly userDataRepo: IUserDataRepo) {}

  async execute(): Promise<CurrentUser | null> {
    try {
      const userData = await this.userDataRepo.get();
      return userData;
    } catch (error) {
      return null;
    }
  }
}
