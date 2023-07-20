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
    <div>
      <h1>register</h1>
      <form action="" onSubmit={login}>
        <label htmlFor="">
          email
          <input
            type="email"
            name="email"
            onChange={onChangeField}
            value={currentUser.email}
          />
        </label>
        <br />
        <label htmlFor="">
          password
          <input
            type="password"
            name="password"
            onChange={onChangeField}
            value={currentUser.password}
          />
        </label>
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginPage;
