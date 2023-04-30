import React, { createContext, useState } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [isVisibleFullPost, setIsVisibleFullPost] = useState(false);
  const [isVisibleNewPublication, setIsVisibleNewPublication] = useState(false);
  const [isVisibleModifyPost, setIsVisibleModifyPost] = useState(false);
  const [isVisibleModalError, setIsVisibleModalError] = useState(false);
  const [error, setError] = useState("");

  const body = document.querySelector("body");

  function OpenModalFullPost(boolean) {
    if (boolean === true) {
      body.style.overflow = "hidden";
      setIsVisibleFullPost(boolean);
    } else {
      body.style.overflow = "";
      setIsVisibleFullPost(boolean);
    }
  }

  function OpenModalNewPublication(boolean) {
    if (boolean === true) {
      body.style.overflow = "hidden";
      setIsVisibleNewPublication(boolean);
    } else {
      setIsVisibleNewPublication(boolean);
      body.style.overflow = "";
    }
  }

  function OpenModalModifyPost(boolean) {
    setIsVisibleModifyPost(boolean);
  }

  function OpenModalError(boolean, message) {
    setError(message);
    setIsVisibleModalError(boolean);
    setTimeout(() => {
      setIsVisibleModalError(false);
    }, 5000);
  }

  return (
    <StateContext.Provider
      value={{
        OpenModalFullPost,
        isVisibleFullPost,
        OpenModalNewPublication,
        isVisibleNewPublication,
        OpenModalModifyPost,
        isVisibleModifyPost,
        OpenModalError,
        isVisibleModalError,
        error,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
