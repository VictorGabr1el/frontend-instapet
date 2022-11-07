import { useState, useContext } from "react";
import { api } from "../../services/api";

import { AuthContext } from "../../context/AuthContext";

import { Btn } from "../atoms";

function BtnComment(props) {
  const { updateDataPage, user } = useContext(AuthContext);

  const [content, setContent] = useState("");

  const newComment = (e) => {
    e.preventDefault();

    const data = {
      userId: user.user_id,
      postId: props.postId,
      content,
    };

    api
      .post(`/user/${user.user_id}/post/${props.postId}/comment`, data)
      .then((response) => {
        const Data = response.data;
        updateDataPage(Data);
        setContent("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="div_interations_new-coment">
        <input
          type="text"
          name=""
          onChange={(e) => setContent(e.target.value)}
          placeholder="adicione um comentário"
        />
        <Btn
          class={"btn_global_postagem"}
          click={newComment}
          txt={"Publicar"}
        />
      </div>
    </>
  );
}

export default BtnComment;
