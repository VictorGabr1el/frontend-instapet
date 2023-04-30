import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { StateContext } from "../../context";
import { Api } from "../../services";
import { Suggestions, useLoading } from "../../components";

import style from "./Search.module.css";

export const Search = () => {
  const { OpenModalError } = useContext(StateContext);
  const { username } = useParams();
  const [users, setUsers] = useState([]);
  const { Loading, loading, setLoading } = useLoading();

  useEffect(() => {
    if (username.length > 0) {
      setLoading(true);
      Api.get(`/users/${username}`)
        .then((response) => {
          setUsers(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          OpenModalError(true, error);
        });
    }
  }, [username]);

  return loading ? (
    <Loading />
  ) : (
    <main className={style.main}>
      {users.length > 0 ? (
        users.map((u) => (
          <Suggestions
            key={u.id}
            userId={u.id}
            avatar={u.avatar}
            username={u.username}
            text={"seguir"}
            verifyIfFollowing={true}
            usenameStyle={{ fontSize: "large" }}
            avatarStyle={{ width: "50px", height: "50px" }}
            btnStyle={{ padding: "4px 12px", letterSpacing: "1px" }}
          />
        ))
      ) : (
        <div>
          <h3 className={style.h3}>Pagina de busca!</h3>
          <h5 className={style.h3}>Desculpe! nenhum {username} encontrado</h5>
        </div>
      )}
    </main>
  );
};
