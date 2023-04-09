import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext, StateContext } from "../../context";

import { Header } from "../Header";
import { FullPublication } from "../FullPublication";
import { NewPublication } from "../ModalNewPublication";

export const Default = (props) => {
  const { isVisibleFullPost, isVisibleNewPublication } =
    useContext(StateContext);
  const { currentUser } = useContext(AuthContext);
  const { postId } = useParams();

  return (
    <div className="class_body">
      <Header user={currentUser} />
      {props.children}
      {(postId || isVisibleFullPost) && <FullPublication />}
      {isVisibleNewPublication && <NewPublication />}
    </div>
  );
};
