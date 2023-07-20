import React, { useContext, useEffect, useState } from "react";
import { GetCommentsMock } from "../mocks/comments";
import { Comment } from "../domain/Comment";
import { UserContext } from "../context/UserProvider";

type CommentsProps = {
  recipeId: string;
};

const Comments: React.FC<CommentsProps> = ({ recipeId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentComment, setCurrentComment] = useState<string>("");

  const userContext = useContext(UserContext);

  useEffect(() => {
    setComments(GetCommentsMock.get());
  }, []);

  const addComment = () => {
    const newComment: Comment = {
      text: currentComment,
      createdAt: new Date().toISOString(),
      recipeId,
      user: { id: userContext.user!.id, name: userContext.user!.name },
    };
    GetCommentsMock.add(newComment);
    setComments(() => [...GetCommentsMock.get()]);
    setCurrentComment("");
  };

  const deleteComment = (id: string) => {
    const newComments = comments.filter((c) => c.id !== id);
    GetCommentsMock.set(newComments);
    setComments(() => [...GetCommentsMock.get()]);
  };

  return (
    <div>
      <h4>Comments</h4>
      <ul>
        {comments?.map(({ id, createdAt, text, user }) => {
          return (
            <li key={id}>
              <span>{`${createdAt} - ${text}`}</span>
              <span>{`${user?.id} - ${user?.name}`}</span>
              {user?.id === userContext.user!.id && (
                <button type="button" onClick={() => deleteComment(id!)}>
                  X
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <div>
        <span>{userContext.user?.name}</span>
        <br />
        <input
          type="text"
          name=""
          id=""
          value={currentComment}
          onChange={(e) => setCurrentComment(e.target.value)}
        />
        <button type="button" onClick={addComment}>
          add comment
        </button>
      </div>
    </div>
  );
};

export default Comments;
