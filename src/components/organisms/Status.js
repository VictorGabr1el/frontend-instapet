import React, { useState, useEffect } from "react";
import { api } from "../../services/api";

import { PerfilStatus } from "../molecules";

export const Status = (props) => {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    api.get("/users").then((response) => {
      setFriends(response.data.user);
    });
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
};
