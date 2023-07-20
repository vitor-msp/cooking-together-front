import { CurrentUser } from "../domain/User";

export interface IHttpGate {
  postUser(user: CurrentUser): Promise<void>;
  login(user: CurrentUser): Promise<{ token: string }>;
}
