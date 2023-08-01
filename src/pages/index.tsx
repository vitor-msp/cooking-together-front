import { NextPage } from "next";
import React from "react";

const HomePage: NextPage = () => {
  return (
    <>
      <p className="text-5xl mt-4 text-center w-full text-orange-600">
        More than a website to share recipes, <br />a{" "}
        <strong className="text-6xl">web platform</strong> to <br />
        <strong className="text-6xl">share cooking experiences</strong>.
      </p>
    </>
  );
};

export default HomePage;
