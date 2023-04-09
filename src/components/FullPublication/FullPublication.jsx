import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { StateContext, AuthContext } from "../../context";
import { Api } from "../../services/Api";

import { EditOrDeletePost } from "../EditOrDeletePost";
import { FormComment } from "../FormComment";
import { useLoading } from "../Loading";
import { Comment } from "../Comment";

import { like, share } from "../../assents/images";
import style from "./FullPublication.module.css";
import { CreatedAt } from "../CreatedAt";

export const FullPublication = () => {
  const { Loading, loading, setLoading } = useLoading();
  const { postId, userId } = useParams();
  const { newData, currentUser } = useContext(AuthContext);
  const { OpenModalFullPost } = useContext(StateContext);
  const [post, setPost] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!postId && userId) {
      OpenModalFullPost(false);
      return navigate(`/user/${userId}`);
    } else if (!postId) {
      OpenModalFullPost(false);
      return navigate("/home");
    } else
      Api.get(`/post/${postId}`)
        .then((response) => {
          setLoading(false);
          setPost(response.data);
        })
        .catch((error) => {
          OpenModalFullPost(false);
          console.log(error);
          return navigate("/home");
        });
  }, [postId, newData]);

  const functionClose = () => {
    OpenModalFullPost(false);
    setPost([]);
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className={style.modal_fullpublication} key={post.id}>
        <Link
          className="btn_close"
          onClick={functionClose}
          to={userId ? `/user/${userId}` : "/home"}
        ></Link>
        <article className={style.article}>
          <div className={style.image_post}>
            <img src={post.img_post} alt="" />
          </div>
          <div className={style.interactions}>
            <div className={style.post_user}>
              <img className="avatar" src={post.User.avatar} />
              <p>{post.User.username}</p>
              {currentUser.id === post.User.id && (
                <EditOrDeletePost PostId={post.id} />
              )}
            </div>
            <div className={style.div_interactions}>
              <div className={style.legend_and_comment}>
                <div className={style.legend}>
                  <p>
                    <strong>{post.User.username}: </strong>
                    {post.legend}
                  </p>
                </div>
                <div className={style.post_comment}>
                  {post.Comments.map((C) => (
                    <Comment
                      key={C.id}
                      avatar={C.User.avatar}
                      username={C.User.username}
                      content={C.content}
                      userId={C.User.id}
                      created={C.createdAt}
                    />
                  ))}
                </div>
              </div>
              <div className={style.post_informations}>
                <ul className={style.interactions_icons}>
                  <li className={style.icon_list}>
                    <img className={style.icon} src={like} alt="" />
                  </li>
                  <li className={style.icon_list}>
                    <img className={style.icon} src={share} alt="" />
                  </li>
                </ul>
                <CreatedAt created={post.createdAt} />
              </div>
              <FormComment postId={post.id} />
            </div>
          </div>
        </article>
      </div>
    </>
  );
};
