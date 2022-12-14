import React, { useContext, useEffect, useState } from "react";
import { ImgPerfil } from "../atoms";
import { Header, Loading } from "../organisms";
import { AuthContext } from "../../context/AuthContext";

import "../../styles/user.css";

function User(props) {
  const { user, newData } = useContext(AuthContext);

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== 1 && user !== null) {
      fetch(`https://insta-tera.herokuapp.com/user/${user.user_id}/post`)
        .then((response) => response.json())
        .then((date) => {
          setPost(date);
          setLoading(false);
        });
    }
  }, [newData]);

  return loading ? (
    <Loading />
  ) : (
    <div className="class_body">
      <Header userSigned={user} />
      <main className="user_main">
        <section className="user_section">
          <div className="div_user">
            <div className="div_user_avatar">
              <img className="avatar" src={user.avatar} alt="" />
            </div>
            <div className="div_info_user">
              <div className="div_username">
                <div>
                  <h2 className="username">{user.username}</h2>
                </div>
                <div>
                  <button className="btn_editar_perfil">Editar perfil</button>
                </div>
              </div>
              <ul className="ul_follows">
                <li>
                  <strong>0</strong> publicações
                </li>
                <li>
                  <strong>0</strong> seguidores
                </li>
                <li>
                  <strong>0</strong> seguindo
                </li>
              </ul>
              <div>
                <span className="user_full_name">Victor Gabriel</span>
              </div>
            </div>
          </div>
          <div className="div_titule_publications">
            <p>PUBLICAÇÔES</p>
          </div>

          <div className="user_all_publications">
            {post.length > 0 ? (
              post.map((posts) => (
                <div className="user_all_publications_img" key={posts.post_id}>
                  <img src={posts.img_post}></img>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default User;
