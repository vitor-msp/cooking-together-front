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
    <div>
      <form action="" onSubmit={savePassword}>
        <label htmlFor="">
          old password
          <input
            type="password"
            name="oldPassword"
            onChange={onChangeField}
            value={currentPassword.oldPassword}
          />
        </label>
        <br />
        <label htmlFor="">
          new password
          <input
            type="password"
            name="newPassword"
            onChange={onChangeField}
            value={currentPassword.newPassword}
          />
        </label>
        <br />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default ChangePassword;
