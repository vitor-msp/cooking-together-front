import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { CurrentUser } from "../core/domain/User";
import { UserContext } from "../context/UserProvider";

const defaultCurrentUser: CurrentUser = {
  email: "",
  password: "",
};

const LoginPage: NextPage = () => {
  const [currentUser, setCurrentUser] =
    useState<CurrentUser>(defaultCurrentUser);
  const router = useRouter();

  const userContext = useContext(UserContext);

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const success = await userContext.login(currentUser);
    if (success) {
      router.push(`/recipes`);
      return;
    }
    alert("Error to authenticate!! Please, try again!");
  };

  const onChangeField = (event: any) => {
    const newUser = Object.assign(
      {},
      {
        ...currentUser,
        [event.target.name]: event.target.value,
      }
    );
    setCurrentUser(newUser);
  };

  return (
    <div className="default-form">
      <h2 className="text-3xl mb-3">login</h2>
      <form action="" onSubmit={login}>
        <fieldset className="border border-orange-500 mb-1 p-3">
          <div>
            <label htmlFor="email">email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="p-1"
              onChange={onChangeField}
              value={currentUser.email}
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="p-1"
              onChange={onChangeField}
              value={currentUser.password}
            />
          </div>
        </fieldset>
        <button
          type="submit"
          className="bg-orange-500 p-1 text-xl hover:text-orange-500 hover:bg-orange-200 text-gray-100"
        >
          login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
