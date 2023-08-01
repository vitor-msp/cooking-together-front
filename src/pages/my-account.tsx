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
    <div className="default-form">
      <h2 className="text-3xl mb-3">my account</h2>
      <form action="" onSubmit={saveUserData}>
        <fieldset className="border border-orange-500 mb-1 p-3">
          <div>
            <label htmlFor="name">name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="p-1"
              onChange={onChangeField}
              value={currentUserData.name}
              disabled={!canEdit}
            />
          </div>
          <div>
            <label htmlFor="email">email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="p-1"
              value={currentUserData.email}
              disabled={true}
            />
          </div>
        </fieldset>
        {canEdit ? (
          <div className="flex justify-between items-center w-full gap-2">
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-orange-500 p-1 text-xl hover:text-orange-500 hover:bg-orange-200 text-gray-100"
            >
              cancel
            </button>
            <button
              type="submit"
              className="bg-orange-500 p-1 text-xl hover:text-orange-500 hover:bg-orange-200 text-gray-100"
            >
              save
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setCanEdit(true)}
              className="bg-orange-500 p-1 text-xl hover:text-orange-500 hover:bg-orange-200 text-gray-100"
            >
              edit
            </button>
          </>
        )}
      </form>
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
