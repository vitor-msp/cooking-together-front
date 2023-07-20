import React, { useContext, useEffect, useState } from "react";
import { getCommentsMock } from "../mocks/comments";
import { Comment } from "../domain/Comment";
import { UserContext } from "../context/UserProvider";

type CommentsProps = {
  recipeId: string;
};

const Comments: React.FC<CommentsProps> = ({ recipeId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const userContext = useContext(UserContext);

  useEffect(() => {
    setComments(getCommentsMock());
  }, []);

  return (
    <div>
      <ul>
        {comments?.map(({ id, createdAt, text, user }) => {
          return (
            <li key={id}>
              <span>{`${createdAt} - ${text}`}</span>
              <span>{`${user?.id} - ${user?.name}`}</span>
            </li>
          );
        })}
      </ul>
      <span>{userContext.user?.name}</span>
    </div>
  );
};

export default Comments;
