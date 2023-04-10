import { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext.jsx";
import { usePreview } from "../../hooks/index.js";
import { Resize } from "../../utils/index.js";

import { inprogress } from "../../assents/images/index.js";
import style from "./Signup.module.css";

export const Signup = () => {
  const { signed, Signup } = useContext(AuthContext);
  const { InputImg, image } = usePreview();

  const [registering, setRegistering] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [imgUser, setImgUser] = useState("");

  const newUser = (e) => {
    e.preventDefault();

    setRegistering(true);

    Resize(image)
      .then((downloadURL) => {
        const data = {
          name,
          username,
          email,
          avatar: downloadURL,
          password,
          confirmPass,
        };

        Signup(data);

        setRegistering(false);
      })
      .catch((error) => {
        setRegistering(false);
        return error;
      });
  };

  if (!signed) {
    return (
      <>
        <main className={style.main}>
          <div className={style.container}>
            <form className={style.form} onSubmit={newUser}>
              <InputImg
                style={{
                  width: "120px",
                  height: "120px",
                  verticalAlign: "baseline",
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
                  className={style.input}
                  onChange={(e) => setName(e.target.value)}
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
                  className={style.input}
                  minLength={4}
                  maxLength={20}
                  onChange={(e) => setUsername(e.target.value)}
                  required={true}
                  name="username"
                />
              </div>
              <div className={style.div_inputs}>
                <label className={style.label}>Email</label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className={style.input}
                  required={true}
                  name="email"
                />
              </div>
              <div className={style.div_inputs}>
                <label className={style.label}>Senha</label>
                <input
                  type="password"
                  className={style.input}
                  onChange={(e) => setPassword(e.target.value)}
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
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className={style.input}
                  required={true}
                  name="confirmPass"
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
                <img className={style.img_inprogress} src={inprogress} />
              </div>
            </>
          )}
        </main>
      </>
    );
  } else {
    return <Navigate to={`/home`} />;
  }
};
