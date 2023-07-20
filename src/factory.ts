import axios from "axios";
import { LoginUsecase } from "./core/use-cases/LoginUsecase";
import { UserDataRepo } from "./infra/UserDataRepo";
import { HttpGate } from "./infra/HttpGate";
import { SignupUsecase } from "./core/use-cases/SignupUsecase";

const apiUrl = process.env.API_URL;
if (!apiUrl) alert("Error to connect to backend!");

const httpGate = new HttpGate(axios.create({ baseURL: apiUrl }));

export const loginUsecase = new LoginUsecase(httpGate, new UserDataRepo());

export const signupUsecase = new SignupUsecase(httpGate);
