import { useState, useEffect, useContext } from "react";
import { Api } from "../../../../services/Api";
import { AuthContext } from "../../../../context";

export const useRequests = () => {
  const { newData, currentUser } = useContext(AuthContext);
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (currentUser.id) {
      Api.get(`/random/${currentUser.id}`).then((response) => {
        setUser(response.data);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    Api.get("/post").then((response) => {
      setPosts(response.data);
    });
  }, [newData]);

  return { user, posts };
};
