import { useState, useEffect, useContext } from "react";
import { Api } from "../../../../services/Api";
import { AuthContext, StateContext } from "../../../../context";

export const useRequests = () => {
  const { newData, currentUser } = useContext(AuthContext);
  const { OpenModalError } = useContext(StateContext);
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (currentUser.id && currentUser.id !== 0) {
      Api.get(`/random/${currentUser.id}`)
        .then((response) => setUser(response.data))
        .catch((error) => {
          return OpenModalError(true, error.message);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    Api.get("/post")
      .then((response) => setPosts(response.data))
      .catch((error) => {
        return OpenModalError(true, error.message);
      });
  }, [newData]);

  return { user, posts };
};
