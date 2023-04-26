import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../context";
import { Api } from "../../services/Api";

import { useLoading, Suggestions } from "..";
import style from "./useModalFollowers.module.css";

export const ModalFollowers = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { Loading, loading, setLoading } = useLoading();

  const { userId } = useParams();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    Api.get(`/user/${userId}/followers`)
      .then((response) => {
        setFollowers(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [, userId]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className={style.Modal_followers}>
        <div className={style.btn_close} onClick={props.showModal} />
        <div className={style.Modal_size}>
          <div>
            <h3 className={style.Modal_followers_title}>Seguidores</h3>
          </div>
          <div className={style.div_followers}>
            <ul className={style.Followers}>
              {followers.length !== 0 ? (
                followers.map((f) => (
                  <Suggestions
                    key={f.id}
                    userId={f.User.id}
                    avatar={f.User.avatar}
                    username={f.User.username}
                    text={"seguir"}
                    verifyIfFollowing={true}
                    btn={props.showModal}
                  />
                ))
              ) : userId == currentUser.id ? (
                <p className={style.follow_text}>
                  Você não está seguindo ninguém
                </p>
              ) : (
                <p className={style.follow_text}>
                  Este usuário não está seguindo ninguém
                </p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
