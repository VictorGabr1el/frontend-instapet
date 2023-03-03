import { useState, useContext } from "react";

import { api } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { Btn } from "../atoms";
import { inprogress } from "../../img";

export const BtnComment = (props) => {
  const { updateDataPage } = useContext(AuthContext);
  const [InProgressVisivle, setInProgressVisible] = useState(false);
  // const { ComponentInProgress, IsInProgress } = InProgress();

  const [content, setContent] = useState("");

  const newComment = (e) => {
    e.preventDefault();

    const data = {
      postId: props.postId,
      content,
    };

    setInProgressVisible(true);

    setContent("");

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
        setInProgressVisible(false);
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
          value={content}
          name=""
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="adicione um comentário"
        />
        <Btn class={"btn_global_postagem"} type={"submit"} txt={"Publicar"} />
        {InProgressVisivle && (
          <>
            <div
              style={{
                position: "absolute",
                width: "35px",
                height: "35px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "content-box",
                transform: "translate(590%, 0%)",
              }}
            >
              <img
                style={{
                  width: "35px",
                  height: "35px",
                  animation: "loading 1s linear infinite 0ms",
                }}
                src={inprogress}
              />
            </div>
          </>
        )}
      </form>
    </>
  );
};
