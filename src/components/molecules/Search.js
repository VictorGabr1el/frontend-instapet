import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { ImgPerfil } from "../atoms";

import house from "../../img/house.svg";
import add from "../../img/Add.svg";
import signout from "../../img/signout.svg";

function Search(props) {
  const { Singout } = useContext(AuthContext);

  async function newPost() {
    const div = await document.querySelector(".new_publication_disable");
    div.classList.replace("new_publication_disable", "new_publication_enable");

    const body = await document.querySelector("body");
    body.style.overflow = "hidden";

    const opac = await document.querySelector(".enable_opacity");
    opac.style.opacity = "50%";
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
          <img className="nav_img" src={house} alt="" />
        </Link>
        <img
          className="nav_img"
          onClick={newPost}
          src={add}
          alt=""
          id="btnAdd"
        />
        <Link to={"/home/user"}>
          <ImgPerfil avatar={props.avatar} />
        </Link>
      </div>
    </>
  );
}

export default Search;
