import React from "react";
import { UserProvider } from "../context/UserProvider";
import { AppProps } from "next/app";
import Logout from "../components/Logout";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <Logout />
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default MyApp;
