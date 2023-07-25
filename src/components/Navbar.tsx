import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Logout from "./Logout";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
  const isLoggedIn = useContext(UserContext).isLoggedIn;

  return (
    <>
      {isLoggedIn ? (
        <nav className="flex justify-evenly w-screen text-white font-bold bg-red-600">
          <Link
            href={"/recipes"}
            className="hover:bg-white hover:text-red-600 w-max p-2"
          >
            recipes
          </Link>
          <Link
            href={"/my-recipes"}
            className="hover:bg-white hover:text-red-600 w-max p-2"
          >
            my-recipes
          </Link>
          <Link
            href={"/my-account"}
            className="hover:bg-white hover:text-red-600 w-max p-2"
          >
            my-account
          </Link>
          <Logout />
        </nav>
      ) : (
        <nav className="flex justify-evenly w-screen text-white font-bold bg-red-600">
          <Link
            href={"/sign-up"}
            className="hover:bg-white hover:text-red-600 w-max p-2"
          >
            sign up
          </Link>
          <Link
            href={"/login"}
            className="hover:bg-white hover:text-red-600 w-max p-2"
          >
            login
          </Link>
        </nav>
      )}
      <br />
    </>
  );
};

export default Navbar;
