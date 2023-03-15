import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context";
import { api } from "../../services/api";

import "../../styles/modalFollowing.css";
import { Loading } from "../atoms";

export const ModalFollowing = () => {
  const { currentUser } = useContext(AuthContext);
  const [isVisibleModalFollowing, setIsVisibleModalFollowing] = useState(false);
  const { userId } = useParams();
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isVisibleModalFollowing) {
      api
        .get(`/user/${userId}/following`)
        .then((response) => {
          setFollowing(response.data);
          console.log(response.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [isVisibleModalFollowing]);

  const OpenModalFollowing = () => {
    if (isVisibleModalFollowing) {
      setIsVisibleModalFollowing(false);
    } else {
      setIsVisibleModalFollowing(true);
    }
  };

  const ComponentModalFollowing = () => {
    return loading ? (
      <Loading />
    ) : (
      <>
        <div className="Modal_following">
          <div className="btn_close" onClick={OpenModalFollowing} />
          <div className="Modal_following_size">
            <div>
              <h3 className="title_following">Seguindo</h3>
            </div>
            <div className="div_users_following">
              <ul className="ul_users_following">
                {following.length !== 0 ? (
                  following.map((f) => (
                    <li className="li_users_following" key={f.id}>
                      <Link
                        onClick={OpenModalFollowing}
                        className="link_users_following"
                        to={`/user/${f.User.id}`}
                      >
                        <img
                          className="following_avatar"
                          src={f.User.avatar}
                          alt=""
                        />
                        <p className="following_username">{f.User.username}</p>
                      </Link>
                      <button className="following_btn">seguindo</button>
                    </li>
                  ))
                ) : userId == currentUser.id ? (
                  <p className="following_p">Você não está seguindo ninguém</p>
                ) : (
                  <p className="following_p">
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
  return {
    ComponentModalFollowing: isVisibleModalFollowing
      ? ComponentModalFollowing
      : null,
    OpenModalFollowing,
  };
};
