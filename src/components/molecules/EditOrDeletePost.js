import { useState, useContext } from "react";

import { AuthContext } from "../../context";

import { close, more } from "../../img";
import { api } from "../../services/api";
import "../../styles/publication.css";

export const EditOrDeletePost = (props) => {
  const { updateDataPage } = useContext(AuthContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalDeletePost, setIsOpenModalDeletePost] = useState(false);

  function btnOpenClose() {
    if (isOpenModal) {
      setIsOpenModal(false);
    } else {
      setIsOpenModal(true);
    }
  }

  function CloseDeletPost() {
    const body = document.querySelector("body");
    body.style.overflow = "";

    setIsOpenModalDeletePost(false);
  }

  function DeletePost() {
    const token = localStorage.getItem("@Auth:token");

    if (props.PostId) {
      api
        .delete(`post/${props.PostId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          CloseDeletPost();
          updateDataPage(response.data);
        });
    }
  }

  return !isOpenModalDeletePost ? (
    <>
      <div>
        <button className="btn_more" onClick={btnOpenClose}>
          <img className="btn_more_img" src={more} />
        </button>
        {isOpenModal && (
          <div className="modal">
            <div className="btn_close_modal_EditOrDeletePost">
              <button onClick={btnOpenClose}>
                <img src={close} />
              </button>
            </div>
            <div className="btn_edit">
              <p>Editar</p>
            </div>
            <div className="btn_delete">
              <p
                onClick={() => {
                  const body = document.querySelector("body");
                  body.style.overflow = "hidden";
                  btnOpenClose();
                  setIsOpenModalDeletePost(true);
                }}
              >
                Excluir
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  ) : (
    <>
      <div className="second_modal">
        <div className="second_modal_btn_close" onClick={CloseDeletPost} />
        <div className="second_modal_div">
          <div className="second_modal_div_tags">
            <h2 className="second_modal_h2">Excluir Publicação</h2>
            <p className="second_modal_p">
              Tem certeza de que deseja excluir essa publicação?
            </p>
            <button className="second_modal_btn_delete" onClick={DeletePost}>
              Excluir
            </button>
            <button
              className="second_modal_btn_cancel"
              onClick={CloseDeletPost}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
