import ReactDOM from "react-dom/client";
import React from "react";
import { Link } from "react-router-dom";

import ImgPerfil from "../atoms/ImgPerfil";
import { SVGs, Comment, BtnComment } from "../molecules";

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
        <article className="publication" key={users.post_id}>
          <div className="div_user_publication">
            <Link to={`/home/${users.User.user_id}`}>
              <ImgPerfil avatar={users.User.avatar} />
            </Link>
            <p>{users.User.username}</p>
          </div>
          <div className="img_publication">
            <img src={users.img_post} alt="" />
          </div>
          <div className="div_interations">
            <div className="div_interations_emogis">
              <SVGs />
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
                  key={C.comment_id}
                  avatar={C.User.avatar}
                  username={C.User.username}
                  content={C.content}
                />
              ))}
              <div className="div_interations_btn_more-coments">
                <button className="btn_verComentarios" onClick={fullPost(id)}>
                  Ver comentários...
                </button>
              </div>
            </div>
            <BtnComment postId={users.post_id} />
          </div>
        </article>
      ))}
    </>
  );
}
export default Publication;
