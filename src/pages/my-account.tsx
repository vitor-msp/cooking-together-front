import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React, { useContext, useState } from "react";
import { CurrentUser } from "../core/domain/User";
import { editUserDataUsecase, getUserDataUsecase } from "../factory";
import { Cookie } from "../utils/Cookie";
import { UserContext } from "../context/UserProvider";
import ChangePassword from "../components/ChangePassword";

type MyAccountProps = {
  userData: CurrentUser;
};

const MyAccount: NextPage<MyAccountProps> = ({ userData }) => {
  const [currentUserData, setCurrentUserData] = useState<CurrentUser>(userData);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const userContext = useContext(UserContext);

  const onChangeField = (event: any) => {
    const newUserData = Object.assign(
      {},
      {
        ...currentUserData,
        [event.target.name]: event.target.value,
      }
    );
    setCurrentUserData(newUserData);
  };

  const cancelEdit = () => {
    setCanEdit(false);
    setCurrentUserData({ ...userData });
  };

  const saveUserData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const loggedUser = await userContext.getUser();
    if (!loggedUser) return;
    const { token, tokenType } = loggedUser;
    const success = await editUserDataUsecase.execute({
      ...currentUserData,
      token,
      tokenType,
    });
    if (!success) alert("Error to save user data!");
    setCanEdit(false);
  };

  return (
    <div>
      <h1>my account</h1>
      <form action="" onSubmit={saveUserData}>
        <label htmlFor="">
          name
          <input
            type="text"
            name="name"
            onChange={onChangeField}
            value={currentUserData.name}
            disabled={!canEdit}
          />
        </label>
        <br />
        <label htmlFor="">
          email
          <input
            type="email"
            name="email"
            value={currentUserData.email}
            disabled={true}
          />
        </label>
        <br />
        {canEdit ? (
          <>
            <button type="button" onClick={cancelEdit}>
              cancel
            </button>
            <button type="submit">save</button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => setCanEdit(true)}>
              edit
            </button>
          </>
        )}
      </form>
      <hr />
      <ChangePassword />
    </div>
  );
};

export default MyAccount;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const user = Cookie.getUser(context.req.cookies);
  const userData = await getUserDataUsecase.execute(user);
  return { props: { userData } };
};
