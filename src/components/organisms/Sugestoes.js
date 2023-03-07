import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context";
import { api } from "../../services/api";
import { Avatar } from "../atoms";
import { UserSugestao } from "../molecules";

export const Sugestoes = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("@Auth:token");
    api.get("/users").then((response) => {
      setUser(response.data.randomUsers);
    });
  }, []);

  return (
    <>
      <aside className="div-informacoes-user">
        <div
          style={{
            position: "fixed",
            width: "inherit",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          <div style={{ height: "70%" }}>
            <div className="mini-perfil-user">
              <Link to={`/user/${currentUser.id}`}>
                <Avatar avatar={currentUser.avatar} />
                <p>{currentUser.username}</p>
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
          <div style={{ height: "30%", display: "flex" }}>
            <p style={{ marginRight: "30px" }}>&#169; INSTAPET</p>
            <p>Github</p>
          </div>
        </div>
      </aside>
    </>
  );
};
