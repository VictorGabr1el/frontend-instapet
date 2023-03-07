import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext, StateContext } from "../../context";

import { Header, NewPublication, Postagem } from "../organisms";

export const Default = (props) => {
  const { isVisibleFullPost, isVisibleNewPost } = useContext(StateContext);
  const { currentUser } = useContext(AuthContext);
  const { postId } = useParams();

  return (
    <div className="class_body">
      <Header user={currentUser} />
      {props.children}
      {postId ? <Postagem /> : isVisibleFullPost && <Postagem />}
      {isVisibleNewPost && <NewPublication />}
    </div>
  );
};
