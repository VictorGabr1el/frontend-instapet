import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import "../../styles/index.css";

import {
  Header,
  Publication,
  Sugestoes,
  NewPublication,
  Status,
} from "../organisms/index.js";

function Home(props) {
  const [users, setUsers] = React.useState([]);

  const { post, user } = useContext(AuthContext);

  React.useEffect(() => {
    fetch(`http://127.0.0.1:3010/post`)
      .then((response) => response.json())
      .then((date) => setUsers(date));
  }, [post]);

  return (
    <div className="class_body">
      <div>
        <Header userSigned={user} />
        <main className="class_main">
          <div className="flex-container">
            <section className="section_publications">
              <Status user={user} />
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
    </div>
  );
}

export default Home;
