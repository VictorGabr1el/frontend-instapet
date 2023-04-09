import { useState, useContext } from "react";

import { AuthContext } from "../../context";

import { close, more, inprogress } from "../../assents/images";
import { Api } from "../../services/Api";

import style from "./EditOrDeletePost.module.css";

import { EditPublication } from "../ModalEditPublication";

export const EditOrDeletePost = (props) => {
  const { updateDataPage } = useContext(AuthContext);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [isOpenModalDeletePost, setIsOpenModalDeletePost] = useState(false);
  const [inProgressVisivle, setInProgressVisible] = useState(false);
  const [ModalEditPublication, setModalEditePublication] = useState(false);

  const body = document.querySelector("body");

  function OpenCloseEditModal() {
    if (ModalEditPublication) {
      setModalEditePublication(false);
      body.style.overflow = "";
    } else {
      setModalEditePublication(true);
      body.style.overflow = "hidden";
    }
  }
  const DropDown = () => {
    return (
      <div className={style.dropDown}>
        <button
          className={style.btn_more}
          onClick={() => setIsOpenDropDown(!isOpenDropDown)}
        >
          <img className={style.btn_more_img} src={more} />
        </button>
        {isOpenDropDown && (
          <div className={style.modal}>
            <div className={style.btn_close_modal}>
              <button
                className={style.btn_close_modal_button}
                onClick={() => setIsOpenDropDown(false)}
              >
                <img className={style.btn_close_modal_img} src={close} />
              </button>
            </div>
            <div className={style.btn_edit}>
              <p
                className={style.btn_edit_button}
                onClick={() => {
                  body.style.overflow = "hidden";
                  setIsOpenDropDown(false);
                  setModalEditePublication(true);
                }}
              >
                Editar
              </p>
            </div>
            <div className={style.btn_delete}>
              <p
                className={style.btn_delete_button}
                onClick={() => {
                  body.style.overflow = "hidden";
                  setIsOpenDropDown(false);
                  setIsOpenModalDeletePost(true);
                }}
              >
                Excluir
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ModalDeletPost = () => {
    function DeletePost() {
      setInProgressVisible(true);
      setIsOpenModalDeletePost(false);

      const token = localStorage.getItem("@Auth:token");

      if (props.PostId) {
        Api.delete(`post/${props.PostId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            body.style.overflow = "";
            setInProgressVisible(false);
            updateDataPage(response.data);
          })
          .catch((e) => {
            console.log(e);
            body.style.overflow = "";
            setInProgressVisible(false);
          });
      }
    }

    return (
      <div className={style.center_modal}>
        <div
          className={style.modal_delete_post_btn_close}
          onClick={() => {
            setIsOpenModalDeletePost(false);
            body.style.overflow = "";
          }}
        />
        <div className={style.modal_delete_post}>
          <div className={style.modal_delete_post_div}>
            <h2 className={style.modal_delete_post_h2}>Excluir Publicação</h2>
            <p className={style.modal_delete_post_p}>
              Tem certeza de que deseja excluir essa publicação?
            </p>
            <button
              className={style.modal_delete_post_btn_delete}
              onClick={DeletePost}
            >
              Excluir
            </button>
            <button
              className={style.modal_delete_post_btn_cancel}
              onClick={() => {
                body.style.overflow = "";
                setIsOpenModalDeletePost(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const InProgress = () => {
    return (
      <div className={style.center_modal}>
        <div className={style.inprogress}>
          <img
            className={style.inprogress_img}
            alt="animação de progresso"
            src={inprogress}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {(!isOpenDropDown || isOpenDropDown) && <DropDown />}
      {isOpenModalDeletePost && <ModalDeletPost />}
      {ModalEditPublication && (
        <EditPublication PostId={props.PostId} btn={OpenCloseEditModal} />
      )}
      {inProgressVisivle && <InProgress />}
    </>
  );
};
