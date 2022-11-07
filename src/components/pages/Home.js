import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import "../../styles/home.css";

import {
  Header,
  Publication,
  Sugestoes,
  NewPublication,
  Status,
} from "../organisms/index.js";
import Postagem from "../organisms/Postagem";

function Home(props) {
  const [users, setUsers] = React.useState([]);

  const { newData, user } = useContext(AuthContext);

  React.useEffect(() => {
    fetch(`https://insta-tera.herokuapp.com/post`)
      .then((response) => response.json())
      .then((date) => setUsers(date));
  }, [newData]);

  console.log();

  return (
    <div className="class_body">
      <div className="enable_opacity">
        <Header userSigned={user} />
        <main className="class_main">
          <div className="flex-container">
            <section className="section_publications">
              <Status user={user} />
              {/* <!---------- Publicações ---------> */}
              <div className="all-publications">
                {users.length !== 0 ? <Publication user={users} /> : <></>}
              </div>
            </section>
            {/* <!------- sidebar -------> */}
            {user !== {} ? <Sugestoes userSigned={user} /> : <></>}
          </div>
        </main>
      </div>
      <NewPublication />
      <>
        <Postagem />
      </>
    </div>
  );
}

export default Home;
