import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext, StateContext } from "../../context";

import { EditOrDeletePost, CreatedAt, FormComment, Comment } from "../";
import { like, share } from "../../assents/images";
import style from "./Publication.module.css";

export const Publication = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { OpenModalFullPost } = useContext(StateContext);

  return (
    <>
      <article className={style.publication}>
        <div className={style.user_publication}>
          <div className={style.user}>
            <Link to={`/user/${props.UserId}`}>
              <img
                className={style.user_avatar}
                src={props.UserAvatar}
                alt=""
              />
            </Link>
            <p className={style.publication_username}>{props.UserName}</p>
          </div>
          {currentUser.id === props.UserId && (
            <EditOrDeletePost PostId={props.PostId} />
          )}
        </div>
        <div className={style.div_img_publication}>
          {!props.imgPost && (
            <img
              className={style.img_publication}
              src={props.ImgPost}
              alt="image publication"
            />
          )}
        </div>
        <div className={style.interactions}>
          <ul className={style.interactions_emogis}>
            <li>
              <img className={style.emogis_svg} src={like} alt="like" />
            </li>
            <li>
              <img className={style.emogis_svg} src={share} alt="share" />
            </li>
          </ul>
          <p className={style.publication_legend}>
            <strong>{props.UserName}: </strong>
            {props.legend}
          </p>
          <CreatedAt created={props.createdAt} />
          <div>
            {props.PostComments && (
              <Comment
                key={props.PostComments.id}
                userId={props.PostComments.User.id}
                avatar={props.PostComments.User.avatar}
                username={props.PostComments.User.username}
                content={props.PostComments.content}
                created={props.PostComments.createdAt}
              />
            )}
            {props.PostComments1 && (
              <div className={style.div_btn_more}>
                <Link
                  className={style.btn_more}
                  onClick={() => OpenModalFullPost(true)}
                  to={`/home/${props.PostId}`}
                >
                  Ver comentários...
                </Link>
              </div>
            )}
          </div>
          <FormComment postId={props.PostId} />
        </div>
      </article>
    </>
  );
};
