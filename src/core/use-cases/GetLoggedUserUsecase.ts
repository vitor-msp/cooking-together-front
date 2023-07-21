import { CurrentUser } from "../domain/User";
import { IUserDataRepo } from "../gateways/IUserDataRepo";

export class GetLoggedUserUsecase {
  constructor(private readonly userDataRepo: IUserDataRepo) {}

  async execute(): Promise<CurrentUser | null> {
    try {
      return await this.userDataRepo.get();
    } catch (error) {
      return null;
    }
  }
}
