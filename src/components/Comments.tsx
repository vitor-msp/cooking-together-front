import React, { useEffect, useState } from "react";
import { getCommentsMock } from "../mocks/comments";
import { Comment } from "../domain/Comment";

type CommentsProps = {
  recipeId: string;
};

const Comments: React.FC<CommentsProps> = ({ recipeId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

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
    </div>
  );
};

export default Comments;
