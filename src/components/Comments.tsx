import React, { useContext, useEffect, useState } from "react";
import { Comment } from "../core/domain/Comment";
import { UserContext } from "../context/UserProvider";
import { CurrentUser } from "../core/domain/User";
import {
  addCommentUsecase,
  deleteCommentUsecase,
  getCommentsUsecase,
} from "../factory";

type CommentsProps = {
  recipeId: string;
};

const Comments: React.FC<CommentsProps> = ({ recipeId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loggedUser, setLoggedUser] = useState<CurrentUser>({});
  const [currentComment, setCurrentComment] = useState<string>("");
  const userContext = useContext(UserContext);

  useEffect(() => {
    (async () => {
      setLoggedUser((await userContext.getUser()) || {});
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (loggedUser) getComments();
    })();
  }, [loggedUser]);

  const getComments = async () => {
    const comments = await getCommentsUsecase.execute(recipeId, loggedUser);
    setComments(comments);
  };

  const addComment = async () => {
    const newComment: Comment = {
      text: currentComment,
      createdAt: new Date().toISOString(),
      recipeId,
      user: { id: loggedUser?.id, name: loggedUser?.name },
    };
    const success = await addCommentUsecase.execute(newComment, loggedUser);
    if (!success) {
      alert("Error to add comment!");
      return;
    }
    getComments();
    setCurrentComment("");
  };

  const deleteComment = async (comment: Comment) => {
    const success = await deleteCommentUsecase.execute(comment, loggedUser);
    if (!success) {
      alert("Error to delete comment!");
      return;
    }
    const newComments = comments.filter((c) => c.id !== comment.id);
    setComments(() => [...newComments]);
  };

  return (
    <div>
      <h4>Comments</h4>
      <ul>
        {comments?.map((comment) => {
          const { id, createdAt, text, user } = comment;
          return (
            <li key={id}>
              <span>{`${createdAt} - ${text}`}</span>
              <span>{`${user?.id} - ${user?.name}`}</span>
              {user?.id === loggedUser?.id && (
                <button type="button" onClick={() => deleteComment(comment)}>
                  X
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <div>
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
