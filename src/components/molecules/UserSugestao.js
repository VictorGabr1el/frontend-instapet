import { Link } from "react-router-dom";
import { Avatar, Btn } from "../atoms";

export const UserSugestao = (props) => {
  return (
    <>
      <div className="novas-sugestoes">
        <div>
          <Link to={`/user/${props.userId}`} className="user_sugestoes">
            <Avatar avatar={props.avatar} />
            <p>{props.username}</p>
          </Link>
        </div>
        <Btn txt={"seguir"} />
      </div>
    </>
  );
};
