import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Api } from "../../services/Api";
import { inprogress } from "../../assents/images";
import { AuthContext } from "../../context";
import verifyIfFollowing from "./utils";

import style from "./Suggestions.module.css";

export const Suggestions = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(props.text);

  props.verifyIfFollowing &&
    verifyIfFollowing(currentUser.Followings, props.userId).then((res) => {
      if (res) {
        setText("seguindo");
      }
    });

  const token = localStorage.getItem("@Auth:token");

  function Follow() {
    setLoading(true);

    Api(`/follow/${props.userId}`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setLoading(false);
        setText("seguindo");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  function unFollow() {
    setLoading(true);
    Api.delete(`/following/${props.userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setLoading(false);
        setText("seguir");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }

  return (
    <>
      <li className={style.new_suggestions}>
        <div>
          <Link
            to={`/user/${props.userId}`}
            onClick={props.btn}
            className={style.user_suggestions}
          >
            <img className="avatar" src={props.avatar} alt="" />
            <p>{props.username}</p>
          </Link>
        </div>
        <div className={style.div_display_flex}>
          {loading ? (
            <img alt="icon" className={style.in_progress} src={inprogress} />
          ) : (
            <button
              className={style.btn_follow}
              onClick={text === "seguir" ? Follow : unFollow}
            >
              {text}
            </button>
          )}
        </div>
      </li>
    </>
  );
};
