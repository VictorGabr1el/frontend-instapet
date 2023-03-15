import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext, StateContext } from "../../context";
import { Avatar } from "../atoms";

import { home, Add, signout } from "../../img";

export const Header = () => {
  const { Singout, currentUser } = useContext(AuthContext);
  const { OpenModalNewPost } = useContext(StateContext);

  async function newPost() {
    OpenModalNewPost(true);

    const body = await document.querySelector("body");
    body.style.overflow = "hidden";
  }
  return (
    <>
      <header className="class_header">
        <nav className="class_nav">
          <div>
            <h1 className="title_home">InstaPet</h1>
          </div>
          <div className="nav_div_butons">
            <input
              className="search"
              type="text"
              name="pesquisar"
              placeholder="pesquisar"
              id=""
            />
            <Link className="nav_img_signout" onClick={Singout}>
              <img className="img_signout" src={signout} alt="sign out" />
            </Link>
            <Link className="nav_img_home" to={"/home"}>
              <img className="img_home" src={home} alt="back to main page" />
            </Link>
            <button className="nav_button_add" onClick={newPost} alt="">
              <img className="img_add" alt="new publication" src={Add} />
            </button>
            <Link to={`/user/${currentUser.id}`}>
              <Avatar avatar={currentUser.avatar} />
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};
