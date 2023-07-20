import { CurrentUser } from "../core/domain/User";
import { IUserDataRepo } from "../core/gateways/IUserDataRepo";

export class UserDataRepo implements IUserDataRepo {
  async save(user: CurrentUser): Promise<void> {
    localStorage.setItem("user", JSON.stringify(user));
  }

  async get(): Promise<CurrentUser | null> {
    const userJson = localStorage.getItem("user");
    if (!userJson) return null;
    return JSON.parse(userJson);
  }
}
