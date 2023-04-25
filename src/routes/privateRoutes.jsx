import { useContext } from "react";
import { Outlet, useParams, Navigate, useHref } from "react-router-dom";

import { AuthContext, StateContext } from "../context";
import { FullPublication, NewPublication, Header } from "../components";

import style from "../components/Default/Default.module.css";

export const PrivateRoute = () => {
  const { postId } = useParams();
  const href = useHref();
  const { currentUser, signed } = useContext(AuthContext);
  const { isVisibleFullPost, isVisibleNewPublication } =
    useContext(StateContext);

  return signed ? (
    <div className={style.Class_Body}>
      <Header user={currentUser} />
      <Outlet />
      {(postId || isVisibleFullPost) && <FullPublication />}
      {isVisibleNewPublication && <NewPublication />}
    </div>
  ) : (
    href !== "/" && <Navigate to={"/"} />
  );
};
