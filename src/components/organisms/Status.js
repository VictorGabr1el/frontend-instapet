import React, { useState } from "react";
import { api } from "../../services/api";

import PerfilStatus from "../molecules/PerfilStatus";

function Status(props) {
  const [friends, setFriends] = useState([]);
  React.useEffect(() => {
    api.get("/users").then((response) => setFriends(response.data));
  }, []);

  return (
    <>
      <div className="div_status-container">
        <div className="div_status">
          {friends.map((user) => (
            <PerfilStatus avatar={user.avatar} key={user.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Status;
