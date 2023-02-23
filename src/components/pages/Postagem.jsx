import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { StateContext, AuthContext } from "../../context";
import { api } from "../../services/api";

import { BtnComment, Comment } from "../molecules";
import { Loading } from "../organisms";
import { Avatar } from "../atoms";

import like from "../../img/like.svg";
import send from "../../img/send-fill.svg";
import "../../styles/postagem.css";

export const Postagem = (props) => {
  const { postId, userId } = useParams();
  const { newData } = useContext(AuthContext);
  const { OpenModalFullPost } = useContext(StateContext);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/post/${postId}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
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

  return loading ? (
    <Loading />
  ) : (
    <>
      {post.map((posts) => (
        <div className="class_enable" key={posts.id}>
          <Link
            className="btn_close"
            onClick={functionClose}
            to={userId ? `/user/${userId}` : "/home"}
          ></Link>
          <article className="class_post">
            <div className="post_div_img">
              <div>
                <img src={posts.img_post} alt="" />
              </div>
            </div>
            <div className="post_interation">
              <div className="div_user_publication">
                <Avatar avatar={posts.User.avatar} />
                <p>{posts.User.username}</p>
              </div>
              <div className="div_interation">
                <div className="legend_comment">
                  <div className="post_legend">
                    <p>
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
                <BtnComment postId={posts.id} />
              </div>
            </div>
          </article>
        </div>
      ))}
    </>
  );
};
