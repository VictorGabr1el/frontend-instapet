import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Default } from "../templates/Default";
import { Loading } from "../atoms";
import { api } from "../../services/api";
import { AuthContext, StateContext } from "../../context";

import { Follow } from "../../functions/Follow";
import { ModalFollowing, useModalFollowers } from "../organisms";
import "../../styles/user.css";

export const User = () => {
  const { currentUser, newData } = useContext(AuthContext);
  const { OpenModalFullPost } = useContext(StateContext);
  const { userId } = useParams();
  const { ComponentModalFollowing, OpenModalFollowing } = ModalFollowing();
  const { ModalFollowers, OpenModalFollowers } = useModalFollowers();

  const [userPage, setUserPage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/user/${userId}`).then((response) => {
      setUserPage(response.data);
      setLoading(false);
    });
  }, [newData, userId]);

  return (
    <Default>
      {loading ? (
        <Loading />
      ) : (
        <main className="user_main">
          <section className="user_section">
            <div className="div_user">
              <div className="div_user_avatar">
                <img className="userpage_avatar" src={userPage.avatar} alt="" />
              </div>
              <div className="div_info_user">
                <div className="div_username">
                  <div>
                    <h2 className="username">{userPage.username}</h2>
                  </div>
                  <div>
                    {userPage.id === currentUser.id ? (
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
                    <strong>{userPage.Posts.length}</strong> publicações
                  </li>
                  <li className="userpage_followers">
                    {
                      <button onClick={OpenModalFollowers}>
                        <strong>{userPage.Followers.length}</strong> seguidores
                      </button>
                    }
                  </li>
                  <li className="userpage_following">
                    <button onClick={() => OpenModalFollowing()}>
                      <strong>{userPage.Followings.length}</strong> seguindo
                    </button>
                  </li>
                </ul>
                <div>
                  <span className="user_full_name">{userPage.name}</span>
                </div>
              </div>
            </div>
            <div className="div_titule_publications">
              <p>PUBLICAÇÕES</p>
            </div>
            <div className="user_all_publications">
              {userPage.Posts.length === 0 && userPage.id !== currentUser.id ? (
                <p className="no_publication">
                  Este usuário não tem nenhuma publicação
                </p>
              ) : (
                userPage.Posts.length === 0 &&
                userPage.id === currentUser.id && (
                  <p className="no_publication">
                    Você não tem nenhuma publicação
                  </p>
                )
              )}
              {userPage.Posts.map((post) => (
                <div key={post.id} className="user_all_publications_img">
                  <Link
                    onClick={() => OpenModalFullPost(true)}
                    to={`/user/${userId}/post/${post.id}`}
                  >
                    <img src={post.img_post} alt=""></img>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}
      {ComponentModalFollowing && <ComponentModalFollowing />}
      {ModalFollowers && <ModalFollowers />}
    </Default>
  );
};
