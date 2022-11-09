import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImgPerfil } from "../atoms";
import UserSugestao from "../molecules/UserSugestao";

function Sugestoes(props) {
  const [user, setUser] = useState([]);

  React.useEffect(() => {
    fetch(`https://insta-tera.herokuapp.com/user`)
      .then((response) => response.json())
      .then((date) => setUser(date));
  }, []);

  return (
    <>
      <aside className="div-informacoes-user">
        <div>
          <div className="mini-perfil-user">
            <Link to={`/user/${props.userSigned.user_id}`}>
              <ImgPerfil avatar={props.userSigned.avatar} />
              <p>{props.userSigned.username}</p>
            </Link>
          </div>
          <div className="div-sugestoes">
            <div className="sugestoes_p">
              <p>Sugestões</p>
            </div>
            <div>
              {user.map((users) => (
                <UserSugestao
                  userId={users.user_id}
                  avatar={users.avatar}
                  username={users.username}
                  key={users.user_id}
                />
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sugestoes;
