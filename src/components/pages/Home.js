import React, { StrictMode, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context";
import { api } from "../../services/api";

import { Publication, Sugestoes, Status } from "../organisms/index.js";
import { Loading } from "../atoms";
import { Default } from "../templates/Default";

import "../../styles/home.css";
import { InProgress } from "../atoms/InProgress";

export const Home = (props) => {
  const { newData } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/post").then((response) => {
      setPosts(response.data);
      setLoading(false);
    });
  }, [newData]);
  console.log(posts);

  return (
    <Default>
      {loading ? (
        <Loading />
      ) : (
        // <InProgress />
        <main className="class_main">
          <div className="flex-container">
            <section className="section_publications">
              <Status />
              {/* <!---------- Publicações ---------> */}
              <div className="all-publications">
                <>
                  {posts.map((post) => (
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
                </>
              </div>
            </section>
            {/* <!------- sidebar -------> */}
            <Sugestoes />
          </div>
        </main>
      )}
    </Default>
  );
};
