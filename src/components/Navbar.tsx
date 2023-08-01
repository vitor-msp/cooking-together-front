import Link from "next/link";
import React, { useContext, useEffect } from "react";
import Logout from "./Logout";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    userContext.getUser();
  }, []);

  return (
    <>
      {userContext.isLoggedIn ? (
        <nav className="flex justify-evenly items-center w-full text-gray-100 font-bold bg-orange-500">
          <Link
            href={"/recipes"}
            className="hover:bg-gray-100 hover:text-orange-500 w-max p-2 text-center"
          >
            recipes
          </Link>
          <Link
            href={"/my-recipes"}
            className="hover:bg-gray-100 hover:text-orange-500 w-max p-2 text-center"
          >
            my recipes
          </Link>
          <Link
            href={"/my-account"}
            className="hover:bg-gray-100 hover:text-orange-500 w-max p-2 text-center"
          >
            my account
          </Link>
          <Logout />
        </nav>
      ) : (
        <>
          <nav className="flex justify-evenly w-screen text-gray-100 font-bold bg-orange-500">
            <Link
              href={"/sign-up"}
              className="hover:bg-gray-100 hover:text-orange-500 w-max p-2 text-center"
            >
              sign up
            </Link>
            <Link
              href={"/login"}
              className="hover:bg-gray-100 hover:text-orange-500 w-max p-2 text-center"
            >
              login
            </Link>
          </nav>
        </>
      )}
    </>
  );
};

export default Navbar;
