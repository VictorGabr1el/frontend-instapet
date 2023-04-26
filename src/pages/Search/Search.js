import { useParams } from "react-router-dom";

import { Suggestions } from "../../components";
import style from "./Search.module.css";
import { useEffect, useState } from "react";
import { Api } from "../../services";
import { useLoading } from "../../components";

export const Search = () => {
  const { username } = useParams();
  const [users, setUsers] = useState([]);
  const { Loading, loading, setLoading } = useLoading();

  useEffect(() => {
    if (username.length > 0) {
      setLoading(true);
      Api.get(`/users/${username}`).then((response) => {
        setUsers(response.data);
        setLoading(false);
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
          />
        ))
      ) : (
        <div>
          <h3 className={style.h3}>Pagina de busca!</h3>
        </div>
      )}
    </main>
  );
};
