import { createContext, useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import { Api } from "../services/Api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(true);
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("@Auth:token");

    if (token) {
      Api.get("/logado", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setCurrentUser(response.data);
        })
        .catch((error) => {
          // localStorage.clear();
          console.log(error);
          return setCurrentUser(null);
        });
    } else {
      return setCurrentUser(null);
    }
  }, []);

  const Signin = async ({ email, password }) => {
    Api.post("/login", { email, password })
      .then((response) => {
        if (response.data.error) {
          return alert(response.data.message);
        } else {
          setCurrentUser(response.data.user);

          Api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;

          localStorage.setItem("@Auth:token", response.data.token);
        }
      })
      .catch((response) => {
        alert(response.data.message);
      });
  };

  const Signup = async (data) => {
    try {
      const response = await Api.post("/register", data);

      if (response.data.error) {
        return alert(response.data.message);
      } else {
        setCurrentUser(response.data.user);

        Api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        localStorage.setItem("@Auth:token", response.data.token);

        return redirect("/home");
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
    setCurrentUser(null);

    return redirect("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        Signin,
        Signup,
        Singout,
        updateDataPage,
        signed: !!currentUser,
        newData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
