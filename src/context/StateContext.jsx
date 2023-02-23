import React, { createContext, useState } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [isVisibleFullPost, setIsVisibleFullPost] = useState(false);
  const [isVisibleNewPost, setIsVisibleNewPost] = useState(false);
  const [isVisibleModifyPost, setIsVisibleModifyPost] = useState(false);

  const OpenModalFullPost = (boolean) => {
    setIsVisibleFullPost(boolean);
  };

  const OpenModalNewPost = (boolean) => {
    setIsVisibleNewPost(boolean);
  };
  const OpenModalModifyPost = (boolean) => {
    setIsVisibleModifyPost(boolean);
  };

  return (
    <StateContext.Provider
      value={{
        OpenModalFullPost,
        isVisibleFullPost,
        OpenModalNewPost,
        isVisibleNewPost,
        OpenModalModifyPost,
        isVisibleModifyPost,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
