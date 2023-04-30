import { useContext, useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import { AuthContext } from "../../context";
import { ModalError } from "../../components";

import { inprogress } from "../../assents/images";
import style from "./Login.module.css";

export const Login = () => {
  const { Login, signed, errorMessage } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (errorMessage) {
      setLoading(false);
      setShowModal(true);
    }
  }, [errorMessage]);

  function userLogin(event) {
    event.preventDefault();
    setLoading(true);
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    Login(data);
  }

  const Entering = () => {
    return (
      <div className={style.div_inprogress}>
        <img
          className={style.img_inprogress}
          src={inprogress}
          alt="progress icon"
        />
      </div>
    );
  };

  return !signed ? (
    <>
      <div className={style.login_page}>
        <header className={style.title_page}>
          <div className={style.logo_text}>InstaPet</div>
        </header>
        <main className={style.container}>
          <div className={style.container_login}>
            <form onSubmit={userLogin} className={style.form}>
              <h2 className={style.form_title}>Bem vindo ao InstaPet</h2>
              <div className={style.form_div_inputs}>
                <label className={style.label}>Email</label>
                <input
                  name="email"
                  type="email"
                  autoComplete="off"
                  ref={emailRef}
                  required={true}
                  className={style.input}
                />
              </div>
              <div className={style.form_div_inputs}>
                <label className={style.label}>Password</label>
                <input
                  type="password"
                  name="password"
                  ref={passwordRef}
                  required={true}
                  className={style.input}
                />
              </div>
              <Link href="#" className={style.forget_password}>
                Esqueci a senha?
              </Link>
              <button className={style.btn} type="submit">
                Acessar
              </button>
            </form>
          </div>
          <div className={style.right_container}>
            <Link to={"/register"} className={style.btn_signup_link}>
              <button className={style.btn}>Cadastrar</button>
            </Link>
          </div>
        </main>
      </div>
      {loading && <Entering />}
      {showModal && (
        <ModalError
          style={{ background: "black", opacity: "15%" }}
          errorMessage={errorMessage}
          btnClose={() => setShowModal(false)}
        />
      )}
    </>
  ) : (
    <Navigate to={"/home"} />
  );
};
