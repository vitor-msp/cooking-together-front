import "../styles/globals.css";
import React from "react";
import { UserProvider } from "../context/UserProvider";
import { AppProps } from "next/app";
import Navbar from "../components/Navbar";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <div className="min-h-screen flex flex-col items-center justify-between">
        <Navbar />
        <div className="grow flex justify-center items-center">
          <Component {...pageProps} />
        </div>
      </div>
    </UserProvider>
  );
};

export default MyApp;
