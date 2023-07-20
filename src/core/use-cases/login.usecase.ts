import { CurrentUser } from "../domain/User";
import { IHttpGate } from "../gateways/IHttpGate";
import { IUserDataRepo } from "../gateways/IUserDataRepo";

export class LoginUsecase {
  constructor(
    private readonly userApi: IHttpGate,
    private readonly userDataRepo: IUserDataRepo
  ) {}

  async execute(user: CurrentUser): Promise<CurrentUser> {
    const { token } = await this.userApi.postUser(user);
    user.token = token;
    await this.userDataRepo.save(user);
    return user;
  }
}
