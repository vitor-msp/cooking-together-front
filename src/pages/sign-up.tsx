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
    <div className="flex flex-col justify-center items-center p-2">
      <h1 className="text-3xl text-center mb-3 text-orange-600">register</h1>
      <form action="" onSubmit={signUp} className="flex flex-col items-center">
        <fieldset className="flex flex-col justify-evenly items-center border border-orange-500 p-3 mb-1 rounded-md">
          <div className="grid grid-cols-6 my-1 items-center">
            <label htmlFor="name" className="col-span-2 text-right pr-3">
              name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="col-span-4 rounded-md hover:bg-orange-100 p-1"
              onChange={onChangeField}
              value={currentUser.name}
            />
          </div>
          <div className="grid grid-cols-6 my-1 items-center">
            <label htmlFor="email" className="col-span-2 text-right pr-3">
              email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="col-span-4 rounded-md hover:bg-orange-100 p-1"
              onChange={onChangeField}
              value={currentUser.email}
            />
          </div>
          <div className="grid grid-cols-6 my-1 items-center">
            <label htmlFor="password" className="col-span-2 text-right pr-3">
              password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="col-span-4 rounded-md hover:bg-orange-100 p-1"
              onChange={onChangeField}
              value={currentUser.password}
            />
          </div>
        </fieldset>
        <button
          type="submit"
          className="w-full bg-orange-500 text-gray-100 rounded-md p-1 text-xl hover:text-orange-500 hover:bg-orange-200 transition-all"
        >
          register
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
