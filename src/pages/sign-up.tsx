import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CurrentUser } from "../core/domain/User";
import { signupUsecase } from "../factory";

const defaultCurrentUser: CurrentUser = {
  email: "",
  name: "",
  password: "",
};

const SignUpPage: NextPage = () => {
  const [currentUser, setCurrentUser] =
    useState<CurrentUser>(defaultCurrentUser);
  const router = useRouter();

  const signUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const success = await signupUsecase.execute(currentUser);
    if (success) {
      router.push(`/login`);
      return;
    }
    alert("Error to register!! Please, try again!");
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
      <h2 className="text-3xl mb-3">register</h2>
      <form action="" onSubmit={signUp}>
        <fieldset className="border border-orange-500 mb-1 p-3">
          <div>
            <label htmlFor="name">name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="p-1"
              onChange={onChangeField}
              value={currentUser.name}
            />
          </div>
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
          register
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
