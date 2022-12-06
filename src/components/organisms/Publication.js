import React from "react";
import { Link } from "react-router-dom";

import ImgPerfil from "../atoms/ImgPerfil";
import { Comment, BtnComment } from "../molecules";

import like from "../../img/like.svg";
import send from "../../img/send-fill.svg";

function Publication(props) {
  const fullPost = async () => {
    const close = await document.querySelector(".class_disable");
    close.classList.replace("class_disable", "class_enable");

    const body = await document.querySelector("body");
    body.style.overflow = "hidden";

    const opac = await document.querySelector(".enable_opacity");
    opac.style.opacity = "50%";
  };

  return (
    <>
      {props.user.map((users) => (
        <article className="publication" key={users.id}>
          <div className="div_user_publication">
            <Link to={`/user/${users.User.id}`}>
              <ImgPerfil avatar={users.User.avatar} />
            </Link>
            <p>{users.User.username}</p>
          </div>
          <div className="img_publication">
            <img src={users.img_post} alt="" />
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
                <strong>{users.User.username}: </strong>
                {users.legend}
              </p>
            </div>
            <div className="post_createdAt">
              <p>HÁ 3 DIAS</p>
            </div>
            <div>
              {users.Comments.map((C) => (
                <Comment
                  key={C.id}
                  userId={C.User.id}
                  avatar={C.User.avatar}
                  username={C.User.username}
                  content={C.content}
                />
              ))}
              <div className="div_interations_btn_more-coments">
                <button className="btn_verComentarios" onClick={fullPost}>
                  Ver comentários...
                </button>
              </div>
            </div>
            <BtnComment postId={users.id} />
          </div>
        </article>
      ))}
    </>
  );
}
export default Publication;
