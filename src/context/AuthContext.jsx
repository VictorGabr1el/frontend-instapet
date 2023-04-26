import { createContext, useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import { Api } from "../services";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(true);
  const [newData, setNewData] = useState(false);

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
          setCurrentUser(false);
          localStorage.clear();
          console.log(error);
          return;
        });
    } else {
      return setCurrentUser(false);
    }
  }, [newData]);

  const Login = async ({ email, password }) => {
    Api.post("/login", { email, password })
      .then((response) => {
        console.log(response);
        setCurrentUser(response.data.user);
        localStorage.setItem("@Auth:token", response.data.token);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const Signup = async (data) => {
    Api.post("/register", data)
      .then((response) => {
        setCurrentUser(response.data.user);
        Api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        localStorage.setItem("@Auth:token", response.data.token);

        return redirect("/home");
      })
      .catch((response) => {
        console.log(response);
        return alert(response.data);
      });
  };

  const Singout = () => {
    localStorage.clear();
    setCurrentUser(false);
    return redirect("/");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        Login,
        Signup,
        Singout,
        updateDataPage: () => setNewData(!newData),
        signed: !!currentUser,
        newData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
