import axios from "axios";
import { LoginUsecase } from "./core/use-cases/LoginUsecase";
import { UserDataRepo } from "./infra/UserDataRepo";
import { HttpGate } from "./infra/HttpGate";
import { SignupUsecase } from "./core/use-cases/SignupUsecase";
import { GetRecipesUsecase } from "./core/use-cases/GetRecipesUsecase";
import { GetRecipeUsecase } from "./core/use-cases/GetRecipeUsecase";
import { LogoutUsecase } from "./core/use-cases/LogoutUsecase";
import { GetMyRecipesUsecase } from "./core/use-cases/GetMyRecipesUsecase";
import { AddRecipeUsecase } from "./core/use-cases/AddRecipeUsecase";
import { GetLoggedUserUsecase } from "./core/use-cases/GetLoggedUserUsecase";
import { EditRecipeUsecase } from "./core/use-cases/EditRecipeUsecase";
import { GetUserDataUsecase } from "./core/use-cases/GetUserDataUsecase";
import { EditUserDataUsecase } from "./core/use-cases/EditUserDataUsecase";
import { ChangePasswordUsecase } from "./core/use-cases/ChangePasswordUsecase";
import { DeleteRecipeUsecase } from "./core/use-cases/DeleteRecipeUsecase";
import { AddCommentUsecase } from "./core/use-cases/AddCommentUsecase";
import { GetCommentsUsecase } from "./core/use-cases/GetCommentsUsecase";
import { DeleteCommentUsecase } from "./core/use-cases/DeleteCommentUsecase";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) console.log("Error to connect to backend!");
const httpGate = new HttpGate(axios.create({ baseURL: apiUrl }));
const userDataRepo = new UserDataRepo();

export const loginUsecase = new LoginUsecase(httpGate, userDataRepo);
export const logoutUsecase = new LogoutUsecase(httpGate, userDataRepo);
export const signupUsecase = new SignupUsecase(httpGate);
export const getLoggedUserUsecase = new GetLoggedUserUsecase(userDataRepo);
export const getUserDataUsecase = new GetUserDataUsecase(httpGate);
export const editUserDataUsecase = new EditUserDataUsecase(httpGate);
export const changePasswordUsecase = new ChangePasswordUsecase(httpGate);

export const addRecipeUsecase = new AddRecipeUsecase(httpGate);
export const editRecipeUsecase = new EditRecipeUsecase(httpGate);
export const deleteRecipeUsecase = new DeleteRecipeUsecase(httpGate);
export const getRecipesUsecase = new GetRecipesUsecase(httpGate);
export const getRecipeUsecase = new GetRecipeUsecase(httpGate);
export const getMyRecipesUsecase = new GetMyRecipesUsecase(httpGate);

export const addCommentUsecase = new AddCommentUsecase(httpGate);
export const getCommentsUsecase = new GetCommentsUsecase(httpGate);
export const deleteCommentUsecase = new DeleteCommentUsecase(httpGate);