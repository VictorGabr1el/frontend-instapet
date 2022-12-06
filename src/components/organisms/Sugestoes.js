import React, { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { ImgPerfil } from "../atoms";
import UserSugestao from "../molecules/UserSugestao";

function Sugestoes(props) {
  const [user, setUser] = useState([]);

  React.useEffect(() => {
    const token = localStorage.getItem("@Auth:token");
    api
      .get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      });
  }, []);

  return (
    <>
      <aside className="div-informacoes-user">
        <div>
          <div className="mini-perfil-user">
            <Link to={`/user/${props.userSigned.id}`}>
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
                  userId={users.id}
                  avatar={users.avatar}
                  username={users.username}
                  key={users.id}
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
