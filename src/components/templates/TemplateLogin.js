import React from "react";
import { FormLogin, Overlay } from "../organisms";
import FormSignup from "../organisms/FormSignup";

function TemplateLogin() {
  return (
    <>
      <div className="body_login_page">
        <header className="header_title">
          <div className="logo-text">InstaPet</div>
        </header>
        <div className="container right-panel-active">
          {/* <!-- Cadastro --> */}
          <FormSignup />
          {/* <!-- Entrar --> */}
          <FormLogin />
          {/* <!-- Overlay --> */}
          <Overlay />
        </div>
      </div>
    </>
  );
}

export default TemplateLogin;
