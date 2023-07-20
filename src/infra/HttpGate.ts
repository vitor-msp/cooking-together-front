import { AxiosInstance } from "axios";
import { CurrentUser } from "../core/domain/User";
import { IHttpGate } from "../core/gateways/IHttpGate";

export class HttpGate implements IHttpGate {
  constructor(private readonly api: AxiosInstance) {}

  async postUser(user: CurrentUser): Promise<void> {
    const res = await this.api
      .post(`/users`, user)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error("error to register");
      });
  }

  async login(user: CurrentUser): Promise<{ token: string }> {
    const res = await this.api
      .post<{ token: string }>(`/login`, user)
      .then((res) => res.data)
      .catch(() => {
        throw new Error("error to authenticate");
      });
    return { token: res.token };
  }
}
