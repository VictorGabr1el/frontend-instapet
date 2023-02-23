import { useState, useContext } from "react";
import { api } from "../../services/api";

import { AuthContext } from "../../context/AuthContext";

import { Btn } from "../atoms";

export const BtnComment = (props) => {
  const { updateDataPage } = useContext(AuthContext);

  const [content, setContent] = useState("");

  const newComment = (e) => {
    e.preventDefault();

    const data = {
      postId: props.postId,
      content,
    };

    console.log(data);
    const token = localStorage.getItem("@Auth:token");
    api
      .post(`/comment`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const Data = response.data;
        updateDataPage(Data);
        setContent("");
        e.form.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form className="form_interations_new-coment" onSubmit={newComment}>
        <input
          type="text"
          required={true}
          name=""
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="adicione um comentário"
        />
        <Btn class={"btn_global_postagem"} type={"submit"} txt={"Publicar"} />
      </form>
    </>
  );
};
