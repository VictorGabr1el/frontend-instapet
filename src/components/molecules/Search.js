import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext, StateContext } from "../../context";
import { Avatar } from "../atoms";

import { home, Add, signout } from "../../img";

export const Search = (props) => {
  const { Singout } = useContext(AuthContext);
  const { OpenModalNewPost } = useContext(StateContext);

  async function newPost() {
    OpenModalNewPost(true);

    const body = await document.querySelector("body");
    body.style.overflow = "hidden";
  }

  return (
    <>
      <div className="nav_div_butons">
        <input
          className="search"
          type="text"
          name="pesquisar"
          placeholder="pesquisar"
          id=""
        />
        <Link onClick={Singout}>
          <img className="nav_img_signout" src={signout} alt="" />
        </Link>
        <Link to={"/home"}>
          <img className="nav_img" src={home} alt="" />
        </Link>
        <img
          className="nav_img"
          onClick={newPost}
          src={Add}
          alt=""
          id="btnAdd"
        />
        <Link to={`/user/${props.id}`}>
          <Avatar avatar={props.avatar} />
        </Link>
      </div>
    </>
  );
};
