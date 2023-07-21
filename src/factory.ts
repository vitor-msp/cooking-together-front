import axios from "axios";
import { LoginUsecase } from "./core/use-cases/LoginUsecase";
import { UserDataRepo } from "./infra/UserDataRepo";
import { HttpGate } from "./infra/HttpGate";
import { SignupUsecase } from "./core/use-cases/SignupUsecase";
import { GetRecipesUsecase } from "./core/use-cases/GetRecipesUsecase";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) console.log("Error to connect to backend!");
const httpGate = new HttpGate(axios.create({ baseURL: apiUrl }));
const userDataRepo = new UserDataRepo();
export const loginUsecase = new LoginUsecase(httpGate, userDataRepo);
export const signupUsecase = new SignupUsecase(httpGate);
export const getRecipesUsecase = new GetRecipesUsecase(httpGate, userDataRepo);
