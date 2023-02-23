import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Default } from "../templates/Default";
import { Loading } from "../organisms";
import { AuthContext, StateContext } from "../../context";

import "../../styles/user.css";
import { api } from "../../services/api";
import { Follow } from "../../functions/Follow";

export const User = (props) => {
  const { user } = useContext(AuthContext);
  const { OpenModalFullPost } = useContext(StateContext);
  const { userId } = useParams();

  const [userPage, setUserPage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/user/${userId}`).then((response) => {
      setUserPage(response.data);
      setLoading(false);
    });
  }, [userId]);

  const publicationsNumber = userPage && userPage.Posts.length;

  const isFollowing =
    user.Followings &&
    user.Followings.find((element) => element.follow === userPage.id);

  const btnOpenModalFullPost = () => {
    OpenModalFullPost(true);
  };

  return (
    <Default>
      {loading ? (
        <Loading />
      ) : (
        <main className="user_main">
          <section className="user_section">
            <div className="div_user">
              <div className="div_user_avatar">
                <img className="avatar" src={userPage.avatar} alt="" />
              </div>
              <div className="div_info_user">
                <div className="div_username">
                  <div>
                    <h2 className="username">{userPage.username}</h2>
                  </div>
                  <div>
                    {userPage.id === user.id ? (
                      <button className="btn_editar_perfil">
                        Editar perfil
                      </button>
                    ) : (
                      <button
                        className="btn_editar_perfil"
                        onClick={() => Follow(userPage.id)}
                      >
                        Seguir
                      </button>
                    )}
                  </div>
                </div>
                <ul className="ul_follows">
                  <li>
                    <strong>{publicationsNumber}</strong> publicações
                  </li>
                  <li>
                    <strong>0</strong> seguidores
                  </li>
                  <li>
                    <strong>0</strong> seguindo
                  </li>
                </ul>
                <div>
                  <span className="user_full_name">{userPage.name}</span>
                </div>
              </div>
            </div>
            <div className="div_titule_publications">
              <p>PUBLICAÇÔES</p>
            </div>

            <div className="user_all_publications">
              {userPage.Posts.map((post) => (
                <div key={post.id} className="user_all_publications_img">
                  <Link
                    onClick={btnOpenModalFullPost}
                    to={`/user/${userId}/post/${post.id}`}
                  >
                    <img src={post.img_post}></img>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}
    </Default>
  );
};
