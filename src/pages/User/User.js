import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Api } from "../../services/Api";
import { AuthContext, StateContext } from "../../context";
import { Follow } from "../../utils/Follow";

import {
  Default,
  useLoading,
  useModalFollowers,
  useModalFollowing,
} from "../../components";

import style from "./User.module.css";

export const User = () => {
  const { currentUser, newData } = useContext(AuthContext);
  const { OpenModalFullPost } = useContext(StateContext);
  const { Loading, loading, setLoading } = useLoading();
  const { ModalFollowing, ShowFollowing } = useModalFollowing();
  const { ModalFollowers, showFollowers } = useModalFollowers();

  const { userId } = useParams();
  const [userPage, setUserPage] = useState(false);

  useEffect(() => {
    Api.get(`/user/${userId}`).then((response) => {
      setUserPage(response.data);
      setLoading(false);
    });
  }, [newData, userId]);

  return (
    <Default>
      {loading ? (
        <Loading />
      ) : (
        <main>
          <section className={style.section}>
            <div className={style.div_user}>
              <div className={style.div_user_avatar}>
                <img className={style.avatar} src={userPage.avatar} alt="" />
              </div>
              <div className={style.user_info}>
                <div className={style.div_username}>
                  <h2 className={style.username}>{userPage.username}</h2>
                  {userPage.id === currentUser.id ? (
                    <button className={style.btn_edit_perfil}>
                      Editar perfil
                    </button>
                  ) : (
                    <button
                      className={style.btn_edit_perfil}
                      onClick={() => Follow(userPage.id)}
                    >
                      Seguir
                    </button>
                  )}
                </div>
                <ul className={style.followings_and_followers}>
                  <li className={style.list}>
                    <strong>{userPage.Posts.length}</strong> publicações
                  </li>
                  <li className={style.list}>
                    {
                      <button
                        className={style.list_button}
                        onClick={() => showFollowers(true)}
                      >
                        <strong>{userPage.Followers.length}</strong> seguidores
                      </button>
                    }
                  </li>
                  <li className={style.list}>
                    <button
                      className={style.list_button}
                      onClick={() => ShowFollowing(true)}
                    >
                      <strong>{userPage.Followings.length}</strong> seguindo
                    </button>
                  </li>
                </ul>
                <div>
                  <span className={style.full_name}>{userPage.name}</span>
                </div>
              </div>
            </div>
            <div className={style.publications_title}>
              <p className={style.title}>PUBLICAÇÕES</p>
            </div>
            <div className={style.all_publications}>
              {userPage.Posts.length === 0 && userPage.id !== currentUser.id ? (
                <p className={style.no_publication}>
                  Este usuário não tem nenhuma publicação
                </p>
              ) : (
                userPage.Posts.length === 0 &&
                userPage.id === currentUser.id && (
                  <p className={style.no_publication}>
                    Você não tem nenhuma publicação
                  </p>
                )
              )}
              {userPage.Posts.map((post) => (
                <div key={post.id} className={style.publication}>
                  <Link
                    onClick={() => OpenModalFullPost(true)}
                    to={`/user/${userId}/post/${post.id}`}
                  >
                    <img
                      className={style.publication_img}
                      src={post.img_post}
                      alt=""
                    ></img>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}
      {ModalFollowing && <ModalFollowing />}
      {ModalFollowers && <ModalFollowers />}
    </Default>
  );
};
