import { useContext, useState, useRef, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";

import { AuthContext, StateContext } from "../../context";
import { usePreview } from "../../hooks/index.js";
import { Resize } from "../../utils/index.js";
import { ModalError } from "../../components/index.js";

import { inprogress } from "../../assents/images";
import style from "./Signup.module.css";

export const Signup = () => {
  const { signed, Signup, errorMessage } = useContext(AuthContext);
  const { OpenModalError } = useContext(StateContext);
  const { InputImg, image } = usePreview();

  const [showModal, setShowModal] = useState(false);
  const [registering, setRegistering] = useState(false);
  const nameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef = useRef();

  useEffect(() => {
    if (errorMessage) {
      setShowModal(true);
    }
  }, [errorMessage]);

  const RegisterNewUser = (e) => {
    e.preventDefault();
    setRegistering(true);

    Resize(image)
      .then((downloadURL) => {
        const data = {
          name: nameRef.current.value,
          username: usernameRef.current.value,
          email: emailRef.current.value,
          avatar: downloadURL,
          password: passwordRef.current.value,
          confirmPass: confirmPassRef.current.value,
        };

        Signup(data);
        setRegistering(false);
      })
      .catch((error) => {
        setRegistering(false);
        return OpenModalError(true, error);
      });
  };

  if (!signed) {
    return (
      <>
        <main className={style.main}>
          <div className={style.container}>
            <form className={style.form} onSubmit={RegisterNewUser}>
              <InputImg
                style={{
                  width: "120px",
                  height: "120px",
                  verticalAlign: "bottom",
                  objectFit: "cover",
                  cursor: "pointer",
                  border: "solid 1px #959595",
                  borderRadius: "100%",
                  minHeight: "auto",
                }}
              />
              <div className={style.div_inputs}>
                <label className={style.label}>Nome</label>
                <input
                  type="text"
                  autoComplete="off"
                  className={style.input}
                  ref={nameRef}
                  maxLength={40}
                  minLength={2}
                  required={true}
                  name="name"
                />
              </div>
              <div className={style.div_inputs}>
                <label className={style.label}>Username</label>
                <input
                  type="text"
                  autoComplete="off"
                  className={style.input}
                  minLength={4}
                  maxLength={20}
                  ref={usernameRef}
                  required={true}
                  name="username"
                />
              </div>
              <div className={style.div_inputs}>
                <label className={style.label}>Email</label>
                <input
                  type="email"
                  autoComplete="off"
                  maxLength={50}
                  ref={emailRef}
                  className={style.input}
                  required={true}
                  name="email"
                />
              </div>
              <div className={style.div_inputs}>
                <label className={style.label}>Senha</label>
                <input
                  type="password"
                  maxLength={40}
                  className={style.input}
                  ref={passwordRef}
                  required={true}
                  name="password"
                />
              </div>
              <div className={style.div_inputs}>
                <label className={style.label}>
                  Digite novamente sua senha
                </label>
                <input
                  type="password"
                  ref={confirmPassRef}
                  className={style.input}
                  required={true}
                  name="confirm password"
                />
              </div>

              <Link className={style.link_login} to={"/login"}>
                <p>login</p>
              </Link>
              <button className={style.btn_submit} type={"submit"}>
                Cadastrar
              </button>
            </form>
          </div>
          {registering && (
            <>
              <div className={style.div_inprogress}>
                <img
                  className={style.img_inprogress}
                  src={inprogress}
                  alt="progress icon"
                />
              </div>
            </>
          )}
          {showModal && (
            <ModalError
              style={{ background: "black", opacity: "20%" }}
              errorMessage={errorMessage}
              btnClose={() => setShowModal(false)}
            />
          )}
        </main>
      </>
    );
  } else {
    return <Navigate to={`/home`} />;
  }
};
