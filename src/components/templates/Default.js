import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext, StateContext } from "../../context";

import {
  Header,
  NewPublication,
  Postagem,
  ModalModifyPost,
} from "../organisms";

export const Default = (props) => {
  const { isVisibleFullPost, isVisibleNewPost, isVisibleModifyPost } =
    useContext(StateContext);
  const { user } = useContext(AuthContext);
  const { postId } = useParams();

  return (
    <div className="class_body">
      <Header user={user} />
      {props.children}
      {postId ? <Postagem /> : isVisibleFullPost && <Postagem />}
      {isVisibleNewPost && <NewPublication />}
      {isVisibleModifyPost && <ModalModifyPost />}
    </div>
  );
};
