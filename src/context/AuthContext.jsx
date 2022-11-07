import { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(1);
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("@Auth:token");

    if (token) {
      api
        .get("/logado", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data[0]);
        })
        .catch((error) => {
          localStorage.clear();
          console.log(error);
          return setUser(null);
        });
    } else {
      return setUser(null);
    }
  }, []);

  const Signin = async ({ email, password }) => {
    const response = await api
      .post("/login", { email, password })
      .then((response) => {
        if (response.data.error) {
          return alert(response.data.message);
        } else {
          setUser(response.data.user);

          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;

          localStorage.setItem("@Auth:token", response.data.token);
        }
      })
      .catch((response) => {
        alert(response.response.data.message);
      });
  };

  const Signup = async (data) => {
    try {
      const response = await api.post("/register", data);

      if (response.data.error) {
        return alert(response.data.message);
      } else {
        setUser(response.data.user);

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        localStorage.setItem("@Auth:token", response.data.token);

        return <Navigate to="/home" />;
      }
    } catch (response) {
      return alert(response.response.data.message);
    }
  };

  const updateDataPage = (data) => {
    setNewData(data);
  };

  const Singout = () => {
    localStorage.clear();
    setUser(null);

    return <Navigate to="/" />;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        Signin,
        Signup,
        Singout,
        updateDataPage,
        signed: !!user,
        newData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
