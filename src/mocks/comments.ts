import { Comment } from "../domain/Comment";

export abstract class GetCommentsMock {
  static id: number = 0;

  static comments: Comment[] = [
    {
      id: "1",
      user: { id: "10", name: "ciclano" },
      createdAt: new Date().toISOString(),
      text: "çfkjbpwh qohfrv hvoher",
    },
    {
      id: "2",
      user: { id: "100", name: "beltrano" },
      createdAt: new Date().toISOString(),
      text: "çfkjbpwh qohfrv hvoher",
    },
    {
      id: "3",
      user: { id: "16", name: "akjjrbv" },
      createdAt: new Date().toISOString(),
      text: "çfkjbpwh qohfrv hvoher",
    },
  ];

  static add(comment: Comment): void {
    comment.id = (this.id++).toString();
    console.log(this.id);
    this.comments.push(comment);
  }

  static get() {
    return this.comments;
  }

  static set(comments: Comment[]): void {
    this.comments = comments;
  }
}
