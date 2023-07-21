import { ParsedUrlQuery } from "querystring";

export abstract class Params {
  static getId(params?: ParsedUrlQuery): string {
    if (!params || !params.id || params.id.length === 0) return "";
    //@ts-ignore
    return params.id;
  }
}
