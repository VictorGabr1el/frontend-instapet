import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context";
import { useRequests } from "./hooks/useRequests";
import {
  Default,
  Publication,
  Suggestions,
  useLoading,
} from "../../components";

import style from "./Home.module.css";
import "../../styles/home.css";

export const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const { user, posts } = useRequests();
  const { Loading } = useLoading();

  return (
    // <Default>
    !posts || !user ? (
      <Loading />
    ) : (
      <main className={style.main}>
        <div className={style.container}>
          <section className={style.section_publications}>
            {/* <!---------- Publicações ---------> */}
            {posts.map((p) => (
              <Publication
                key={p.id}
                UserId={p.User.id}
                UserAvatar={p.User.avatar}
                UserName={p.User.username}
                ImgPost={p.img_post}
                legend={p.legend}
                createdAt={p.createdAt}
                PostComments={p.Comments[0]}
                PostComments1={p.Comments[1]}
                PostId={p.id}
              />
            ))}
          </section>
          {/* <!------- sidebar -------> */}
          <aside className={style.aside}>
            <div className={style.div_fixed}>
              <div>
                <div className={style.current_user}>
                  <Link
                    className={style.current_user_a}
                    to={`/user/${currentUser.id}`}
                  >
                    <img
                      className={style.avatar}
                      src={currentUser.avatar}
                      alt=""
                    />
                    <p className={style.username}>{currentUser.username}</p>
                  </Link>
                </div>
                <div className={style.suggestions}>
                  <div className={style.suggestions_title}>
                    <p>Sugestões</p>
                  </div>
                  <div>
                    {user.map((users) => (
                      <Suggestions
                        userId={users.id}
                        avatar={users.avatar}
                        username={users.username}
                        key={users.id}
                        text={"seguir"}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className={style.footer}>
                <a
                  rel="noreferrer"
                  target="_blank"
                  className={style.footer_a}
                  href="https://github.com/VictorGabr1el/backend-instapet"
                >
                  &#169; INSTAPET
                </a>
                <a
                  rel="noreferrer"
                  target="_blank"
                  className={style.footer_a}
                  href="https://github.com/VictorGabr1el/frontend-instapet"
                >
                  Github
                </a>
                <a
                  rel="noreferrer"
                  target="_blank"
                  className={style.footer_a}
                  href="https://www.linkedin.com/in/victor-gabriel-71b1261a2"
                >
                  Linkedin
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>
    )
    // </Default>
  );
};
