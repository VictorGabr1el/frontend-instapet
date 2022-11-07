import { Link } from "react-router-dom";
import ImgPerfil from "../atoms/ImgPerfil";
import Btn from "../atoms/Btn";

function UserSugestao(props) {
  return (
    <>
      <div className="novas-sugestoes">
        <div>
          <Link to={"/home/user"} className="user_sugestoes">
            <ImgPerfil avatar={props.avatar} />
            <p>{props.username}</p>
          </Link>
        </div>
        <Btn txt={"seguir"} />
      </div>
    </>
  );
}

export default UserSugestao;
