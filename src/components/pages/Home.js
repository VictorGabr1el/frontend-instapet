import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context";
import { api } from "../../services/api";

import { Publication, Sugestoes, Status, Loading } from "../organisms/index.js";
import { Default } from "../templates/Default";

import "../../styles/home.css";

export const Home = (props) => {
  const { newData, user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/post").then((response) => {
      setUsers(response.data);
      setLoading(false);
    });
  }, [newData]);
  console.log(users);

  return (
    <Default user={user}>
      {loading ? (
        <Loading />
      ) : (
        <main className="class_main">
          <div className="flex-container">
            <section className="section_publications">
              <Status />
              {/* <!---------- Publicações ---------> */}
              <div className="all-publications">
                {users.map((post) => (
                  <Publication
                    key={post.id}
                    UserId={post.User.id}
                    UserAvatar={post.User.avatar}
                    UserName={post.User.username}
                    ImgPost={post.img_post}
                    legend={post.legend}
                    createdAt={post.createdAt}
                    PostComments={post.Comments[0]}
                    PostId={post.id}
                  />
                ))}
              </div>
            </section>
            {/* <!------- sidebar -------> */}
            <Sugestoes user={user} />
          </div>
        </main>
      )}
    </Default>
  );
};
