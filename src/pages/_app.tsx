import "../styles/globals.css";
import React from "react";
import { UserProvider } from "../context/UserProvider";
import { AppProps } from "next/app";
import Navbar from "../components/Navbar";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <div className="h-screen">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
};

export default MyApp;
