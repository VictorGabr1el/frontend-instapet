import { Link } from "react-router-dom";
import "../../styles/login.css";
import { FormLogin } from "../organisms";

export const Login = () => {
  return (
    <>
      <div className="body_login_page">
        <header className="header_title">
          <div className="logo-text">InstaPet</div>
        </header>
        <div className="container">
          <FormLogin />
          <div className="container_form_btn_signup">
            <div className="overlay">
              <div className="right-panel">
                <Link to={"/register"} className="btn_link_signup">
                  <button className="btn">Cadastrar</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
