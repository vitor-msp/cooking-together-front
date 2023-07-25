import "../styles/globals.css";
import React from "react";
import { UserProvider } from "../context/UserProvider";
import { AppProps } from "next/app";
import Logout from "../components/Logout";
import Link from "next/link";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <nav>
        <Link href={"/recipes"}>recipes</Link>
        <br />
        <Link href={"/my-recipes"}>my-recipes</Link>
        <br />
        <Link href={"/my-account"}>my-account</Link>
      </nav>
      <br />
      <Logout />
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default MyApp;
