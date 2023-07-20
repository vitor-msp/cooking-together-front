import { CurrentUser } from "../domain/User";

export interface IHttpGate {
  postUser(user: CurrentUser): Promise<{ token: string }>;
}
