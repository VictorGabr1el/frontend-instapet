import { Link } from "react-router-dom";

import { CreatedAt } from "../CreatedAt";
import style from "./Comment.module.css";

export const Comment = (props) => {
  return (
    <>
      <div className={style.coment_component}>
        <div className={style.user_comment}>
          <Link to={`/user/${props.userId}`}>
            <img className="avatar" src={props.avatar} alt="" />
          </Link>
        </div>
        <div className={style.comment_content}>
          <p className={style.comment_username}>{props.username}</p>
          <p className={style.comment}>{props.content}</p>
          <div>
            <CreatedAt created={props.created} />
          </div>
        </div>
      </div>
    </>
  );
};
