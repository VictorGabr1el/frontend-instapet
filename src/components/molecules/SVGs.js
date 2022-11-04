import { Link } from "react-router-dom";

import like from "../../img/like.svg";
import send from "../../img/send-fill.svg";

function SVGs() {
  return (
    <>
      <ul>
        <Link path="#">
          <li>
            <img src={like} alt="" />
          </li>
        </Link>
        <Link path="#">
          <li>
            <img src={send} alt="" />
          </li>
        </Link>
      </ul>
    </>
  );
}

export default SVGs;
