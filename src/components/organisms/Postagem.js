import React, { useEffect, useState } from "react";
import { api } from "../../services/api";

import ImgPerfil from "../atoms/ImgPerfil";
import { BtnComment, Comment } from "../molecules";

import like from "../../img/like.svg";
import send from "../../img/send-fill.svg";
import "../../styles/postagem.css";

function Postagem(props) {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("@Auth:token");
    api
      .get("/post", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.json())
      .then((date) => setPost(date));
  }, []);

  return (
    <>
      {post.length !== 0 ? (
        <div className="class_disable">
          <article className="class_post">
            <div className="post_div_img">
              <div>
                <img src={post.img_post} alt="" />
              </div>
            </div>
            <div className="post_interation">
              <div className="div_user_publication">
                <ImgPerfil avatar={post.User.avatar} />
                <p>{post.User.username}</p>
              </div>
              <div className="div_interation">
                <div className="legend_comment">
                  <div className="post_legend">
                    <p>
                      <strong>{post.User.username}: </strong>
                      {post.legend}
                    </p>
                  </div>
                  <div className="post_comment">
                    {post.Comments.map((C) => (
                      <Comment
                        key={C.comment_id}
                        avatar={C.User.avatar}
                        username={C.User.username}
                        content={C.content}
                      />
                    ))}
                  </div>
                </div>
                <div className="btn_like_send">
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
                </div>
                <BtnComment />
              </div>
            </div>
          </article>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Postagem;
