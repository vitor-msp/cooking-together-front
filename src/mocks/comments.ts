import { Comment } from "../domain/Comment";

export const getCommentsMock = (): Comment[] => {
  return [
    {
      id: "1",
      user: { id: "1", name: "ciclano" },
      createdAt: new Date().toISOString(),
      text: "çfkjbpwh qohfrv hvoher",
    },
    {
      id: "2",
      user: { id: "1", name: "beltrano" },
      createdAt: new Date().toISOString(),
      text: "çfkjbpwh qohfrv hvoher",
    },
    {
      id: "3",
      user: { id: "1", name: "akjjrbv" },
      createdAt: new Date().toISOString(),
      text: "çfkjbpwh qohfrv hvoher",
    },
  ];
};
