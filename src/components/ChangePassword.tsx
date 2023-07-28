import React, { useContext, useState } from "react";
import { changePasswordUsecase, logoutUsecase } from "../factory";
import { UserContext } from "../context/UserProvider";
import { ChangePassword } from "../core/domain/ChangePassword";
import { useRouter } from "next/router";

const defualtChangePassword: ChangePassword = {
  oldPassword: "",
  newPassword: "",
};

const ChangePassword: React.FC = ({}) => {
  const [currentPassword, setCurrentPassword] = useState<ChangePassword>(
    defualtChangePassword
  );
  const userContext = useContext(UserContext);
  const router = useRouter();

  const onChangeField = (event: any) => {
    const newCurrentPassword = Object.assign(
      {},
      {
        ...currentPassword,
        [event.target.name]: event.target.value,
      }
    );
    setCurrentPassword(newCurrentPassword);
  };

  const savePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const loggedUser = await userContext.getUser();
    if (!loggedUser) return;
    const success = await changePasswordUsecase.execute(
      loggedUser,
      currentPassword
    );
    if (!success) {
      alert("Error to change password!");
      return;
    }
    await logoutUsecase.execute();
    router.push("/login");
  };

  return (
    <div className="default-form">
      <form action="" onSubmit={savePassword}>
        <fieldset className="border border-orange-500 mb-1 p-3">
          <div>
            <label htmlFor="oldPassword">old password</label>
            <input
              type="password"
              name="oldPassword"
              id="oldPassword"
              className="p-1"
              onChange={onChangeField}
              value={currentPassword.oldPassword}
            />
          </div>
          <div>
            <label htmlFor="newPassword">new password</label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              className="p-1"
              onChange={onChangeField}
              value={currentPassword.newPassword}
            />
          </div>
        </fieldset>
        <button
          type="submit"
          className="bg-orange-500 p-1 text-xl hover:text-orange-500 hover:bg-orange-200 text-gray-100"
        >
          save
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
