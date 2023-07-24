import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React, { useState } from "react";
import { CurrentUser } from "../core/domain/User";
import { getUserDataUsecase } from "../factory";
import { Cookie } from "../utils/Cookie";

type MyAccountProps = {
  userData: CurrentUser;
};

const MyAccount: NextPage<MyAccountProps> = ({ userData }) => {
  const [currentUserData, setCurrentUserData] = useState<CurrentUser>(userData);
  const [canEdit, setCanEdit] = useState<boolean>(false);

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

  const saveUserData = () => {};

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
