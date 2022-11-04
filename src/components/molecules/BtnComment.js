import { useState, useContext } from "react";
import { api } from "../../services/api";

import { AuthContext } from "../../context/AuthContext";

import { Btn } from "../atoms";

function BtnComment(props) {
  const { updatetimeline, user } = useContext(AuthContext);

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
        updatetimeline(Data);
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
        <Btn click={newComment} txt={"Publicar"} />
      </div>
    </>
  );
}

export default BtnComment;
