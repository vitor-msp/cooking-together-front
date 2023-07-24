import { CurrentUser } from "../domain/User";
import { IHttpGate } from "../gateways/IHttpGate";

export class GetUserDataUsecase {
  constructor(private readonly userApi: IHttpGate) {}

  async execute(user: CurrentUser): Promise<CurrentUser | null> {
    try {
      const userData = await this.userApi.getUser(user);
      return userData;
    } catch (error) {
      return null;
    }
  }
}
