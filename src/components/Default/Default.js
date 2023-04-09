import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext, StateContext } from "../../context";

import { FullPublication, NewPublication, Header } from "../";
import style from "./Default.module.css";

export const Default = (props) => {
  const { isVisibleFullPost, isVisibleNewPublication } =
    useContext(StateContext);
  const { currentUser } = useContext(AuthContext);
  const { postId } = useParams();

  return (
    <div className={style.Class_Body}>
      <Header user={currentUser} />
      {props.children}
      {(postId || isVisibleFullPost) && <FullPublication />}
      {isVisibleNewPublication && <NewPublication />}
    </div>
  );
};
