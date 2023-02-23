import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext, StateContext } from "../../context";

import { Avatar, CreatedAt } from "../atoms/index.js";
import { Comment, BtnComment } from "../molecules";

import { like, send, more } from "../../img";

export const Publication = (props) => {
  const { user } = useContext(AuthContext);
  const { OpenModalFullPost } = useContext(StateContext);
  const [isOpen, setIsOpen] = useState(null);

  const OpenMiniModal = () => {
    if (isOpen === null) {
      setIsOpen(true);
    } else {
      setIsOpen(null);
    }
  };

  const btnOpenModalFullPost = () => {
    OpenModalFullPost(true);
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
          {user.id === props.UserId && (
            <div>
              <button className="btn_more" onClick={OpenMiniModal}>
                <img className="btn_more_img" src={more} />
              </button>
              {isOpen && (
                <div
                  className="modal"
                  style={{
                    position: "absolute",
                    transform: "translateX(-105px)",
                  }}
                >
                  <div className="btn_edit">
                    <p>Editar</p>
                  </div>

                  <div className="btn_delete">
                    <p>Excluir</p>
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
            {/* {props.PostComments.map((C) => ( */}
            {props.PostComments && (
              <Comment
                key={props.PostComments.id}
                userId={props.PostComments.User.id}
                avatar={props.PostComments.User.avatar}
                username={props.PostComments.User.username}
                content={props.PostComments.content}
              />
            )}
            {/* ))} */}
            <div className="div_interations_btn_more-coments">
              <Link
                className="btn_verComentarios"
                onClick={btnOpenModalFullPost}
                to={`/home/${props.PostId}`}
              >
                Ver comentários...
              </Link>
            </div>
          </div>
          <BtnComment postId={props.PostId} />
        </div>
      </article>
    </>
  );
};
