import { CurrentUser } from "../core/domain/User";

export abstract class Cookie {
  static getUser(cookies: any): CurrentUser {
    return JSON.parse(cookies["userData"] || "");
  }
}
