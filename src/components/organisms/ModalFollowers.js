import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context";
import { api } from "../../services/api";

import "../../styles/modalFollowing.css";
import { Loading } from "../atoms";

export const useModalFollowers = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [isVisibleModalFollowers, setIsVisibleModalFollowers] = useState(false);
  const { userId } = useParams();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isVisibleModalFollowers) {
      api
        .get(`/user/${userId}/followers`)
        .then((response) => {
          setFollowers(response.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [isVisibleModalFollowers]);

  const OpenModalFollowers = () => {
    if (isVisibleModalFollowers) {
      setIsVisibleModalFollowers(false);
    } else {
      setIsVisibleModalFollowers(true);
    }
  };

  const ModalFollowers = () => {
    return loading ? (
      <Loading />
    ) : (
      <>
        <div className="Modal_following">
          <div className="btn_close" onClick={OpenModalFollowers} />
          <div className="Modal_following_size">
            <div>
              <h3 className="title_following">Seguidores</h3>
            </div>
            <div className="div_users_following">
              <ul className="ul_users_following">
                {followers.length !== 0 ? (
                  followers.map((f) => (
                    <li className="li_users_following" key={f.id}>
                      <Link
                        className="link_users_following"
                        to={`/user/${f.userId}`}
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
    ModalFollowers: isVisibleModalFollowers ? ModalFollowers : null,
    OpenModalFollowers,
  };
};
