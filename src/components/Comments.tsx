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

  const addComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
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
    <div className="mb-6">
      <h4 className="text-xl text-left text-orange-600 mt-1">Comments</h4>
      <div className="my-4">
        <ul>
          {comments?.map((comment) => {
            const { id, createdAt, text, user } = comment;
            const formattedCreatedAt = createdAt
              ? new Date(createdAt).toDateString().toLowerCase()
              : "-";
            return (
              <li key={id} className="my-2 flex justify-between">
                <div>
                  <span>{formattedCreatedAt}</span>
                  <span className="text-orange-500 ml-2 mr-1">{`${user?.name}:`}</span>
                  <span>{text}</span>
                </div>
                {user?.id === loggedUser?.id && (
                  <button
                    type="button"
                    onClick={() => deleteComment(comment)}
                    className="bg-orange-500 p-1 text-sm hover:text-orange-500 hover:bg-orange-200 text-gray-100 w-8 rounded-md transition-all"
                  >
                    X
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="border rounded-md border-orange-500">
        <form action="" onSubmit={addComment}>
          <input
            type="text"
            value={currentComment}
            onChange={(e) => setCurrentComment(e.target.value)}
            className="p-1 rounded-md hover:bg-orange-100 w-full"
            placeholder="comment..."
          />
        </form>
      </div>
    </div>
  );
};

export default Comments;
