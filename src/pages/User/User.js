import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Api } from "../../services/Api";
import { AuthContext, StateContext } from "../../context";

import {
  useLoading,
  ModalFollowers,
  ModalFollowings,
  EditProfile,
} from "../../components";
import { BtnFollowUnFollow } from "../../components/Suggestions/Suggestions";

import style from "./User.module.css";

export const User = () => {
  const { currentUser, newData } = useContext(AuthContext);
  const { OpenModalFullPost } = useContext(StateContext);
  const { Loading, loading, setLoading } = useLoading();
  const { userId } = useParams();

  const [userPage, setUserPage] = useState(false);
  const [showModalEditProfile, setShowModalEditProfile] = useState(false);
  const [showModalFollowers, setShowModalFollowers] = useState(false);
  const [showModalFollowings, setShowModalFollowings] = useState(false);

  useEffect(() => {
    setLoading(true);
    Api.get(`/user/${userId}`)
      .then((response) => {
        setUserPage(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        return;
      });
  }, [newData, userId]);

  if (loading) {
    return <Loading />;
  } else if (!userPage && !loading) {
    return (
      <main className={style.main}>
        <h3 className={style.userNotFound}>Usuário não encontrado!</h3>
      </main>
    );
  } else if (!loading && userPage) {
    return (
      <>
        <main className={style.main}>
          <section className={style.section}>
            <div className={style.div_user}>
              <div className={style.div_user_avatar}>
                <img className={style.avatar} src={userPage.avatar} alt="" />
              </div>
              <div className={style.user_info}>
                <div className={style.div_username}>
                  <h2 className={style.username}>{userPage.username}</h2>
                  {userPage.id === currentUser.id ? (
                    <button
                      className={style.btn_edit_perfil}
                      onClick={() => setShowModalEditProfile(true)}
                    >
                      Editar perfil
                    </button>
                  ) : (
                    <BtnFollowUnFollow
                      text={"seguir"}
                      btnStyle={{ borderRadius: "4px", padding: "6px 10px" }}
                      verifyIfFollowing={
                        userPage.id !== currentUser.id ? true : false
                      }
                      userId={userPage.id}
                    />
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
                        onClick={() => setShowModalFollowers(true)}
                      >
                        <strong>{userPage.Followers.length}</strong> seguidores
                      </button>
                    }
                  </li>
                  <li className={style.list}>
                    <button
                      className={style.list_button}
                      onClick={() => setShowModalFollowings(true)}
                    >
                      <strong>{userPage.Followings.length}</strong> seguindo
                    </button>
                  </li>
                </ul>
                <div>
                  <span className={style.full_name}>{userPage.name}</span>
                </div>
                <div className={style.div_biograph}>
                  <p className={style.biograph}>{userPage.biograph}</p>
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
        {showModalFollowings && (
          <ModalFollowings showModal={() => setShowModalFollowings(false)} />
        )}
        {showModalFollowers && ModalFollowers && (
          <ModalFollowers showModal={() => setShowModalFollowers(false)} />
        )}
        {showModalEditProfile && (
          <EditProfile btn={() => setShowModalEditProfile(false)} />
        )}
      </>
    );
  }
};
