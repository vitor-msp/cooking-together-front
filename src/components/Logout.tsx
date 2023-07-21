import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const logout = async () => {
    const success = await userContext.logout();
    if (success) router.push("/login");
  };
  return (
    <button type="button" onClick={logout}>
      logout
    </button>
  );
};

export default Logout;
