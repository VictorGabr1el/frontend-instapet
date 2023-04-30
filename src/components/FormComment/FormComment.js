import { useContext, useState } from "react";

import { Api } from "../../services/Api";
import { AuthContext, StateContext } from "../../context";

import { inprogress } from "../../assents/images";
import style from "./FormComment.module.css";

export const FormComment = (props) => {
  const { updateDataPage } = useContext(AuthContext);
  const { OpenModalError } = useContext(StateContext);
  const [sendingComment, setSendingComment] = useState(false);

  const newComment = (e) => {
    e.preventDefault();
    setSendingComment(true);

    const comment = e.target.comment;

    const data = {
      postId: props.postId,
      content: comment.value,
    };

    const token = localStorage.getItem("@Auth:token");
    Api.post(`/comment`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        updateDataPage();
        comment.value = "";
        setSendingComment(false);
      })
      .catch((error) => {
        return OpenModalError(true, error);
      });
  };

  return (
    <>
      <form className={style.form_comment} onSubmit={newComment}>
        <input
          type="text"
          autoComplete="off"
          className={style.input_comment}
          required={true}
          name="comment"
          placeholder="adicione um comentário"
        />
        <button className={style.btn_comment_publication_global} type="submit">
          Publicar
        </button>
        {sendingComment && (
          <div className={style.sending_comment}>
            <img
              className={style.sending_comment_img}
              src={inprogress}
              alt=""
            />
          </div>
        )}
      </form>
    </>
  );
};
