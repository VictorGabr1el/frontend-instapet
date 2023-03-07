import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { api } from "../../services/api";

import { AuthContext, StateContext } from "../../context";
import { Avatar } from "../atoms";

import { home, Add, signout } from "../../img";

export const Search = (props) => {
  const { Singout } = useContext(AuthContext);
  const { OpenModalNewPost } = useContext(StateContext);

  // const [userDB, setuserDB] = useState([]);
  // const [modalSearch, setModalSearch] = useState(false);
  // const [busca, setBusca] = useState("");
  // const [buscaResult, setBuscaResult] = useState([]);

  // useEffect(() => {
  //   console.log(userDB);

  //   const a = userDB.find((element) => element.name == busca);
  //   setBuscaResult(a);
  //   console.log(buscaResult);
  // }, [busca]);

  // async function Search() {
  //   await api
  //     .get("http://localhost:5000/users")
  //     .then((response) => {
  //       setuserDB(response.data);
  //       console.log(response.data);
  //       setModalSearch(true);
  //     })
  //     .catch((error) => console.error(error));
  // }

  // function SearchMap() {}

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
          // onClick={Search}
          // onChange={(e) => setBusca(e.target.value)}
          placeholder="pesquisar"
          id=""
        />
        {/* {modalSearch && (
          <div
            style={{
              position: "absolute",
              transform: "transform: translate(-9px, 60px)",
              background: "#f7f7f7",
              width: "190px",
              height: "auto",
              display: "flex",
              // flex-direction: "column",
              // border-radius: "8px",
              // box-sizing: "border-box",
              border: "solid 1px #333",
              // z-index: "1",
            }}
          >
            <div className="btn_edit">
              {buscaResult !== [] &&
                buscaResult.groupToMap((usety) => <p>{usety.name}</p>)}
            </div>
          </div>
        )} */}
        <Link className="nav_img_signout" onClick={Singout}>
          <img className="img_signout" src={signout} alt="" />
        </Link>
        <Link className="nav_img_home" to={"/home"}>
          <img className="img_home" src={home} alt="" />
        </Link>
        <button
          className="nav_button_add"
          onClick={newPost}
          alt=""
          // id="btnAdd"
        >
          <img className="img_add" src={Add} />
        </button>
        <Link to={`/user/${props.id}`}>
          <Avatar avatar={props.avatar} />
        </Link>
      </div>
    </>
  );
};
