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
    <button
      type="button"
      onClick={logout}
      className="hover:bg-gray-100 hover:text-orange-500 w-max p-2 text-center"
    >
      logout
    </button>
  );
};

export default Logout;
