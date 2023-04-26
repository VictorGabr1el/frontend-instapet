import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext, StateContext } from "../../context";

import { home, Add, signout, search } from "../../assents/images";
import style from "./Header.module.css";

export const Header = () => {
  const { Singout, currentUser } = useContext(AuthContext);
  const { OpenModalNewPublication } = useContext(StateContext);
  const searchRef = useRef();
  const navigate = useNavigate();

  function Search(event) {
    event.preventDefault();
    const username = searchRef.current.value;
    return navigate(`/search/${username}`);
  }

  return (
    <>
      <header className={style.header}>
        <nav className={style.nav}>
          <div>
            <h1 className={style.title}>InstaPet</h1>
          </div>
          <div className={style.nav_buttons}>
            <form onSubmit={Search} className={style.form_search}>
              <input
                className={style.input_search}
                type="text"
                name="search"
                required={true}
                ref={searchRef}
                placeholder="pesquisar"
              />
              <button className={style.btn_search} type="submit">
                <img src={search} className={style.img_search} alt="" />
              </button>
            </form>

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
