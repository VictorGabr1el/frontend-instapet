import { createContext, useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import { Api } from "../services";

export const AuthContext = createContext();

const user = {
  id: 0,
  name: "",
  avatar: "",
  username: "",
  biograph: "",
  Followings: [
    {
      id: 0,
      followingId: 0,
    },
  ],
  Followers: [
    {
      id: 0,
      followersId: 0,
    },
  ],
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const [newData, setNewData] = useState(false);
  const [errorMessage, setErrorMesage] = useState("");

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
          return setErrorMesage(error);
        });
    } else {
      return setCurrentUser(false);
    }
  }, [newData]);

  const Login = ({ email, password }) => {
    Api.post("/login", { email, password })
      .then((response) => {
        setCurrentUser(response.data.user);
        localStorage.setItem("@Auth:token", response.data.token);
        return redirect("/home");
      })
      .catch((error) => {
        return setErrorMesage(error);
      });
  };

  const Signup = (data) => {
    Api.post("/register", data)
      .then((response) => {
        setCurrentUser(response.data.user);
        Api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        localStorage.setItem("@Auth:token", response.data.token);

        return redirect("/home");
      })
      .catch((error) => {
        return setErrorMesage(error);
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
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
