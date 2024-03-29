import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AuthContext, StateContext } from "../../context";
import { Api } from "../../services/Api";
import { useLoading, Suggestions } from "..";

import style from "./ModalFollowings.module.css";

export const ModalFollowings = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { OpenModalError } = useContext(StateContext);
  const { Loading, loading, setLoading } = useLoading();

  const { userId } = useParams();
  const [following, setFollowings] = useState([]);

  useEffect(() => {
    Api.get(`/user/${userId}/following`)
      .then((response) => {
        setFollowings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        return OpenModalError(error);
      });
  }, [userId]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className={style.Modal_following}>
        <div
          className={style.btn_close}
          onClick={() => props.showModal(false)}
        />
        <div className={style.Modal_size}>
          <div>
            <h3 className={style.Modal_following_title}>Seguindo</h3>
          </div>
          <div className={style.div_followings}>
            <ul className={style.Followings}>
              {following.length > 0 ? (
                following.map((f) => (
                  <Suggestions
                    key={f.id}
                    userId={f.User.id}
                    avatar={f.User.avatar}
                    username={f.User.username}
                    text={"seguindo"}
                    verifyIfFollowing={true}
                    btn={() => props.showModal(false)}
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
