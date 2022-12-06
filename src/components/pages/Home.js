import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../services/api";

import "../../styles/home.css";

import {
  Header,
  Publication,
  Sugestoes,
  NewPublication,
  Status,
} from "../organisms/index.js";
import { Postagem, Loading } from "../organisms/index.js";

function Home(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { newData, user } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("@Auth:token");
    api
      .get("/post", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
        setLoading(false);
      });
  }, [newData]);

  return loading ? (
    <Loading />
  ) : (
    <div className="class_body">
      <div className="enable_opacity">
        <Header userSigned={user} />
        <main className="class_main">
          <div className="flex-container">
            <section className="section_publications">
              <Status />
              {/* <!---------- Publicações ---------> */}
              <div className="all-publications">
                <Publication user={users} />
              </div>
            </section>
            {/* <!------- sidebar -------> */}
            <Sugestoes userSigned={user} />
          </div>
        </main>
      </div>
      <NewPublication />
      <>{/* <Postagem /> */}</>
    </div>
  );
}

export default Home;
