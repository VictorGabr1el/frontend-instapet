// import "../../styles/test.css";

import ImgPerfil from "../atoms/ImgPerfil";
import { BtnComment, Comment, SVGs } from "../molecules";

import img from "../../img/boby.jpg";
import img2 from "../../img/Boby-perfil.jpg";

function Postagem(props) {
  return (
    <div className="class_app">
      <article className="class_post">
        <div className="post_div_img">
          <div>
            <img src={img} alt="" />
          </div>
        </div>
        <div className="post_interation">
          <div className="div_user_publication">
            <ImgPerfil avatar={img2} />
            <p>Username</p>
          </div>
          <div className="div_interation">
            <div className="legend_comment">
              <div className="post_legend">
                <p>
                  <strong>{props.username}: </strong>
                  {props.legend}
                </p>
              </div>
              <div className="post_comment">
                <Comment
                  avatar={img2}
                  username={"Usuario"}
                  content={"meu comentário"}
                />
              </div>
            </div>
            <div className="btn_like_send">
              <div className="div_interations_emogis">
                <SVGs />
              </div>
            </div>
            <BtnComment />
          </div>
        </div>
      </article>
    </div>
  );
}

export default Postagem;
