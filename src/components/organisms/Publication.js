import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext, StateContext } from "../../context";

import { Avatar, CreatedAt } from "../atoms/index.js";
import { Comment, BtnComment } from "../molecules";

import { like, send, more, close } from "../../img";
import { api } from "../../services/api";

export const Publication = (props) => {
  const { currentUser, updateDataPage } = useContext(AuthContext);
  const { OpenModalFullPost } = useContext(StateContext);
  const [isOpen, setIsOpen] = useState(null);
  const [isOPenModalDeletePost, setIsOpenModalDeletePost] = useState(false);

  const OpenMiniModal = () => {
    if (isOpen === null) {
      setIsOpen(true);
    } else {
      setIsOpen(null);
    }
  };

  const ModalDeletePost = () => {
    function DeletePost() {
      const token = localStorage.getItem("@Auth:token");

      api
        .delete(`post/${props.PostId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const body = document.querySelector("body");
          body.style.overflow = "";

          setIsOpenModalDeletePost(false);
          updateDataPage(response.data);
        });
    }

    return (
      <>
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            onClick={() => {
              const body = document.querySelector("body");
              body.style.overflow = "";

              setIsOpenModalDeletePost(false);
            }}
            style={{
              position: "fixed",
              height: "100%",
              width: "100%",
              zIndex: "0",
              background: "black",
              opacity: "60%",
            }}
          />
          <div
            style={{
              position: "fixed",
              width: "400px",
              height: "200px",
              background: "white",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                textAlign: "center",
                justifyContent: "space-evenly",
                width: "98%",
                marginInline: "auto",
              }}
            >
              <h2
                style={{
                  height: "30%",
                  display: "flex",
                  fontWeight: "600",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Excluir Publicação
              </h2>
              <p style={{ height: "20%" }}>
                Tem certeza de que deseja excluir essa publicação?
              </p>
              <button
                onClick={DeletePost}
                style={{
                  background: "none",
                  height: "25%",
                  border: "none",
                  borderTop: "solid 1px #a7a7a7",
                  borderBottom: "solid 1px #a7a7a7",
                  color: "red",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Excluir
              </button>
              <button
                onClick={() => {
                  const body = document.querySelector("body");
                  body.style.overflow = "";

                  setIsOpenModalDeletePost(false);
                }}
                style={{
                  height: " 25%",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <article className="publication">
        <div className="div_user_publication">
          <div className="div_user_post">
            <Link to={`/user/${props.UserId}`}>
              <Avatar avatar={props.UserAvatar} />
            </Link>
            <p>{props.UserName}</p>
          </div>
          {currentUser.id === props.UserId && (
            <div>
              <button className="btn_more" onClick={OpenMiniModal}>
                <img className="btn_more_img" src={more} />
              </button>
              {isOpen && (
                <div
                  className="modal"
                  style={{
                    position: "absolute",
                    transform: "translate(-120px, -9px)",
                  }}
                >
                  <div className="btn_edit">
                    <button
                      onClick={OpenMiniModal}
                      style={{
                        boxSizing: "border-box",
                        position: "absolute",
                        background: "white",
                        width: " 27px",
                        height: " 27px",
                        transform: "translate(118px, -14px)",
                        border: "solid 1px",
                        borderRadius: "100%",
                        margin: "0",
                        padding: "0",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={close}
                        style={{ width: "100%", height: "100%" }}
                      />
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
                        setIsOpen(false);
                        setIsOpenModalDeletePost(true);
                      }}
                    >
                      Excluir
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="img_publication">
          <img src={props.ImgPost} alt="" />
        </div>
        <div className="div_interations">
          <div className="div_interations_emogis">
            <ul>
              <li>
                <img src={like} alt="" />
              </li>
              <li>
                <img src={send} alt="" />
              </li>
            </ul>
          </div>
          <div className="div_interations_legend">
            <p>
              <strong>{props.UserName}: </strong>
              {props.legend}
            </p>
          </div>
          <CreatedAt created={props.createdAt} />
          <div>
            {props.PostComments && (
              <Comment
                key={props.PostComments.id}
                userId={props.PostComments.User.id}
                avatar={props.PostComments.User.avatar}
                username={props.PostComments.User.username}
                content={props.PostComments.content}
              />
            )}
            <div className="div_interations_btn_more-coments">
              <Link
                className="btn_verComentarios"
                onClick={() => OpenModalFullPost(true)}
                to={`/home/${props.PostId}`}
              >
                Ver comentários...
              </Link>
            </div>
          </div>
          <BtnComment postId={props.PostId} />
        </div>
        {isOPenModalDeletePost && <ModalDeletePost />}
      </article>
    </>
  );
};
