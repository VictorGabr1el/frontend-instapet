import { useState, useEffect, useContext } from "react";
import { Api } from "../../../../services/Api";
import { AuthContext } from "../../../../context";

export const useRequests = () => {
  const { newData } = useContext(AuthContext);
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Api.get("/users").then((response) => {
      setUser(response.data.randomUsers);
    });
  }, []);

  useEffect(() => {
    Api.get("/post").then((response) => {
      setPosts(response.data);
    });
  }, [newData]);

  return { user, posts };
};
