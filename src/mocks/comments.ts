import { Comment } from "../domain/Comment";

export abstract class GetCommentsMock {
  static comments: Comment[] = [
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

  static add(comment: Comment): void {
    GetCommentsMock.comments.push(comment);
  }

  static get() {
    return GetCommentsMock.comments;
  }
}
