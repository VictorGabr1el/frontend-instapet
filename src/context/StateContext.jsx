import React, { createContext, useState } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [isVisibleFullPost, setIsVisibleFullPost] = useState(false);
  const [isVisibleNewPublication, setIsVisibleNewPublication] = useState(false);
  const [isVisibleModifyPost, setIsVisibleModifyPost] = useState(false);

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

  const OpenModalNewPublication = (boolean) => {
    if (boolean === true) {
      setIsVisibleNewPublication(boolean);
      body.style.overflow = "hidden";
    } else {
      setIsVisibleNewPublication(boolean);
      body.style.overflow = "";
    }
  };

  const OpenModalModifyPost = (boolean) => {
    setIsVisibleModifyPost(boolean);
  };

  return (
    <StateContext.Provider
      value={{
        OpenModalFullPost,
        isVisibleFullPost,
        OpenModalNewPublication,
        isVisibleNewPublication,
        OpenModalModifyPost,
        isVisibleModifyPost,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
