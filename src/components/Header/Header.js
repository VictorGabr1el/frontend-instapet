import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext, StateContext } from "../../context";

import { home, Add, signout } from "../../assents/images";
import style from "./Header.module.css";

export const Header = () => {
  const { Singout, currentUser } = useContext(AuthContext);
  const { OpenModalNewPublication } = useContext(StateContext);

  return (
    <>
      <header className={style.header}>
        <nav className={style.nav}>
          <div>
            <h1 className={style.title}>InstaPet</h1>
          </div>
          <div className={style.nav_buttons}>
            <input
              className={style.input_search}
              type="text"
              name="pesquisar"
              placeholder="pesquisar"
            />
            <button className={style.btn_signout} onClick={Singout}>
              <Link to={"/"}>
                <img
                  className={style.img_signout}
                  src={signout}
                  alt="sign out"
                />
              </Link>
            </button>
            <Link className={style.Link_home_page} to={"/home"}>
              <img
                className={style.img_home_page}
                src={home}
                alt="back to main page"
              />
            </Link>
            <button
              className={style.btn_new_publication}
              onClick={() => OpenModalNewPublication(true)}
            >
              <img
                className={style.img_new_publication}
                alt="new publication"
                src={Add}
              />
            </button>
            <Link to={`/user/${currentUser.id}`}>
              <img className={style.avatar} src={currentUser.avatar} alt="" />
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};
