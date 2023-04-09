import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context";
import { Publication } from "../components/Publication";
import { Default } from "../components/templates/Default";
import { Suggestions } from "../components/Suggestions";

import { useLoading } from "../components/Loading";
import { useRequests } from "./Home/hooks/useRequests";

import "../styles/home.css";

export const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const { user, posts } = useRequests();
  const { Loading } = useLoading();

  return (
    <Default>
      {!posts ? (
        <Loading />
      ) : (
        // <InProgress />
        <main className="class_main">
          <div className="flex-container">
            <section className="section_publications">
              {/* <Status /> */}
              {/* <!---------- Publicações ---------> */}
              <div className="all-publications">
                <>
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
                </>
              </div>
            </section>
            {/* <!------- sidebar -------> */}
            <aside className="div-informacoes-user">
              <div
                style={{
                  position: "fixed",
                  width: "inherit",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ height: "70%" }}>
                  <div className="mini-perfil-user">
                    <Link to={`/user/${currentUser.id}`}>
                      <img className="avatar" src={currentUser.avatar} alt="" />
                      <p>{currentUser.username}</p>
                    </Link>
                  </div>
                  <div className="div-sugestoes">
                    <div className="sugestoes_p">
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
                <div
                  style={{
                    height: "30%",
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <p style={{ marginRight: "30px" }}>&#169; INSTAPET</p>
                  <p>Github</p>
                  <p>Linkedin</p>
                </div>
              </div>
            </aside>
          </div>
        </main>
      )}
    </Default>
  );
};
