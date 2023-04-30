import { useContext } from "react";
import { Outlet, useParams, Navigate, useHref } from "react-router-dom";

import { AuthContext, StateContext } from "../context";
import {
  FullPublication,
  NewPublication,
  Header,
  ModalError,
} from "../components";

export const PrivateRoute = () => {
  const { postId } = useParams();
  const href = useHref();
  const { currentUser, signed } = useContext(AuthContext);
  const { isVisibleFullPost, isVisibleNewPublication, isVisibleModalError } =
    useContext(StateContext);

  return signed ? (
    <div
      className="Class_Body"
      style={{
        padding: "0",
        margin: "0",
        background: "#dfe6ed",
        boxSizing: " border-box",
        fontFamily: " system-ui",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header user={currentUser} />
      <Outlet />
      {(postId || isVisibleFullPost) && <FullPublication />}
      {isVisibleNewPublication && <NewPublication />}
      {isVisibleModalError && <ModalError />}
    </div>
  ) : (
    href !== "/" && <Navigate to={"/"} />
  );
};
