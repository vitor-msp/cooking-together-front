import { CurrentUser } from "../domain/User";

export interface IUserDataRepo {
  save(user: CurrentUser): Promise<void>;
  get(): Promise<CurrentUser>;
}
