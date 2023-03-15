import { useState } from "react";
import { Link } from "react-router-dom";
import { inprogress } from "../../img";
import { api } from "../../services/api";
import { Avatar } from "../atoms";

export const UserSugestao = (props) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("seguir");

  const Follow = () => {
    setLoading(true);
    const token = localStorage.getItem("@Auth:token");
    api
      .post(`/follow/${props.followId}`, {
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
  };

  const unFollow = () => {
    setLoading(true);
    const token = localStorage.getItem("@Auth:token");
    api
      .delete(`/following/${props.followId}`, {
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
  };

  return (
    <>
      <div className="novas-sugestoes">
        <div>
          <Link to={`/user/${props.userId}`} className="user_sugestoes">
            <Avatar avatar={props.avatar} />
            <p>{props.username}</p>
          </Link>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {loading ? (
            <img
              alt=""
              className="n_img"
              style={{
                width: "36px",
                height: "22px",
                animation: "loading 1s linear infinite 0ms",
                // position: "absolute",
                // transform: "translateX(7px)",
              }}
              src={inprogress}
            />
          ) : (
            <button onClick={text === "seguir" ? Follow : unFollow}>
              {text}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
