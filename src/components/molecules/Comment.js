import { Link } from "react-router-dom";
import { Avatar } from "../atoms";

export const Comment = (props) => {
  return (
    <>
      <div className="div_interations_coment">
        <div className="div_interations_user-coment">
          <Link to={`/user/${props.userId}`}>
            <Avatar avatar={props.avatar} />
          </Link>
        </div>
        <div className="div_interations-user-text-coment">
          <p className="div_interations-userName-coment">{props.username}</p>
          <p>{props.content}</p>
        </div>
      </div>
    </>
  );
};
