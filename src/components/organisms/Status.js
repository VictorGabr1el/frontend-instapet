import React, { useState } from "react";

import PerfilStatus from "../molecules/PerfilStatus";

function Status(props) {
  const [friends, setFriends] = useState([]);
  React.useEffect(() => {
    fetch(`https://insta-tera.herokuapp.com/user`)
      .then((response) => response.json())
      .then((data) => setFriends(data));
  }, []);

  return (
    <>
      <div className="div_status-container">
        <div className="div_status">
          {friends.map((user) => (
            <PerfilStatus avatar={user.avatar} key={user.user_id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Status;
