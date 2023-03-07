import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext, StateContext } from "../../context";

import { Avatar, CreatedAt } from "../atoms/index.js";
import { Comment, BtnComment, EditOrDeletePost } from "../molecules";

import { like, share } from "../../img";

export const Publication = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { OpenModalFullPost } = useContext(StateContext);

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
            <EditOrDeletePost PostId={props.PostId} />
          )}
        </div>
        <div className="img_publication">
          <div>
            <img src={props.ImgPost} alt="" />
          </div>
        </div>
        <div className="div_interations">
          <div className="div_interations_emogis">
            <ul>
              <li>
                <img
                  className="div_interations_emogis_like"
                  src={like}
                  alt=""
                />
              </li>
              <li>
                <img
                  className="div_interations_emogis_share"
                  src={share}
                  alt=""
                />
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
            {props.PostComments1 && (
              <div className="div_interations_btn_more-coments">
                <Link
                  className="btn_verComentarios"
                  onClick={() => OpenModalFullPost(true)}
                  to={`/home/${props.PostId}`}
                >
                  Ver comentários...
                </Link>
              </div>
            )}
          </div>
          <BtnComment
            postId={props.PostId}
            transform={"translate(590%, 0px)"}
          />
        </div>
      </article>
    </>
  );
};
