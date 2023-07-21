import { CurrentUser, User } from "../core/domain/User";
import { IUserDataRepo } from "../core/gateways/IUserDataRepo";

export class UserDataRepo implements IUserDataRepo {
  async save(user: CurrentUser): Promise<void> {
    document.cookie = `userData=${JSON.stringify(user)}`;
  }

  async get(): Promise<CurrentUser | null> {
    const keyValuePairs = document.cookie.split(";");
    const cookies: any = {};
    keyValuePairs.forEach((item) => {
      const [key, value] = item.split("=");
      cookies[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    const user: CurrentUser = JSON.parse(cookies["userData"]);
    return user;
  }

  async clean(): Promise<void> {
    document.cookie = "userData=null;";
  }
}
