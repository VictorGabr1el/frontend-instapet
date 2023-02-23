import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import { Avatar } from "../atoms";
import { UserSugestao } from "../molecules";

export const Sugestoes = (props) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("@Auth:token");
    api
      .get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, []);

  return (
    <>
      <aside className="div-informacoes-user">
        <div>
          <div className="mini-perfil-user">
            <Link to={`/user/${props.user.id}`}>
              <Avatar avatar={props.user.avatar} />
              <p>{props.user.username}</p>
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
};
