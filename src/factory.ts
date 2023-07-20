import axios from "axios";
import { LoginUsecase } from "./core/use-cases/LoginUsecase";
import { UserDataRepo } from "./infra/UserDataRepo";
import { HttpGate } from "./infra/HttpGate";

const api = axios.create({ baseURL: "http://localhost:3333" });

export const loginUsecase = new LoginUsecase(
  new HttpGate(api),
  new UserDataRepo()
);
