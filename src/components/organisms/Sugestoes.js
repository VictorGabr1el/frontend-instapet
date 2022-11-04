import React, { useState } from "react";
import { ImgPerfil } from "../atoms";
import UserSugestao from "../molecules/UserSugestao";

function Sugestoes(props) {
  const [user, setUser] = useState([]);

  React.useEffect(() => {
    fetch(`http://127.0.0.1:3010/user`)
      .then((response) => response.json())
      .then((date) => setUser(date));
  }, []);

  return (
    <>
      <aside className="div-informacoes-user">
        <div>
          <div className="mini-perfil-user">
            <ImgPerfil avatar={props.userSigned.avatar} />
            <p>{props.userSigned.username}</p>
          </div>
          <div className="div-sugestoes">
            <div className="sugestoes_p">
              <p>Sugestões</p>
            </div>
            <div>
              {user.map((users) => (
                <UserSugestao
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
