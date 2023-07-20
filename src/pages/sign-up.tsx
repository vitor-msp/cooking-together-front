import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CurrentUser } from "../domain/User";

const defaultCurrentUser: CurrentUser = {
  email: "",
  name: "",
  password: "",
};

const SignUpPage: NextPage = () => {
  const [currentUser, setCurrentUser] =
    useState<CurrentUser>(defaultCurrentUser);
  const router = useRouter();

  const signUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    router.push(`/login`);
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
      <form action="" onSubmit={signUp}>
        <label htmlFor="">
          name
          <input
            type="text"
            name="name"
            onChange={onChangeField}
            value={currentUser.name}
          />
        </label>
        <br />
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
        <button type="submit">register</button>
      </form>
    </div>
  );
};

export default SignUpPage;
