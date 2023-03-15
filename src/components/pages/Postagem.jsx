import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { StateContext, AuthContext } from "../../context";
import { api } from "../../services/api";

import { BtnComment, Comment, EditOrDeletePost } from "../molecules";
import { Avatar } from "../atoms";

import { like, share } from "../../img";

import "../../styles/postagem.css";

export const Postagem = () => {
  const { postId, userId } = useParams();
  const { newData, currentUser } = useContext(AuthContext);
  const { OpenModalFullPost } = useContext(StateContext);
  const [post, setPost] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/post/${postId}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        return navigate("/home", -1);
      });
  }, [postId, newData]);

  const functionClose = () => {
    OpenModalFullPost(false);
    setPost([]);
    return navigate("/home");
  };

  return (
    <>
      {post.map((posts) => (
        <div className="class_enable" key={posts.id}>
          <Link
            className="btn_close"
            onClick={functionClose}
            to={userId ? `/user/${userId}` : "/home"}
          ></Link>
          <article className="class_post">
            <div
              className="post_div_img"
              style={{ heigh: "100%", width: "-webkit-fill-available" }}
            >
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={posts.img_post} alt="" />
              </div>
            </div>
            <div className="post_interation" style={{ width: "auto" }}>
              <div className="post_info_user">
                <Avatar avatar={posts.User.avatar} />
                <p>{posts.User.username}</p>
                {currentUser.id === posts.User.id && (
                  <div style={{ marginLeft: "auto" }}>
                    <EditOrDeletePost PostId={posts.id} />
                  </div>
                )}
              </div>
              <div className="div_interation">
                <div className="legend_comment">
                  <div className="post_legend">
                    <p style={{ wordBreak: "break-all" }}>
                      <strong>{posts.User.username}: </strong>
                      {posts.legend}
                    </p>
                  </div>
                  <div className="post_comment">
                    {posts.Comments.map((C) => (
                      <Comment
                        key={C.id}
                        avatar={C.User.avatar}
                        username={C.User.username}
                        content={C.content}
                      />
                    ))}
                  </div>
                </div>
                <ul className="interactions_icons">
                  <li>
                    <img className="icon" src={like} alt="" />
                  </li>
                  <li>
                    <img className="icon" src={share} alt="" />
                  </li>
                </ul>
                <BtnComment
                  postId={posts.id}
                  transform={"translate(110px, 0px)"}
                />
              </div>
            </div>
          </article>
        </div>
      ))}
    </>
  );
};
