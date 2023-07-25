import React, { useContext, useEffect, useState } from "react";
import { Comment } from "../core/domain/Comment";
import { UserContext } from "../context/UserProvider";
import { CurrentUser } from "../core/domain/User";
import { addCommentUsecase } from "../factory";

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
      setComments([]);
      setLoggedUser((await userContext.getUser()) || {});
    })();
  }, []);

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
    setComments((c) => [...c, newComment]);
    setCurrentComment("");
  };

  const deleteComment = (id: string) => {
    const newComments = comments.filter((c) => c.id !== id);
    setComments(() => [...newComments]);
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
              {user?.id === loggedUser?.id && (
                <button type="button" onClick={() => deleteComment(id!)}>
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
