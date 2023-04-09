import { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import style from "./FormLogin.module.css";

export const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Signin, signed } = useContext(AuthContext);

  const userLogin = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    await Signin(data);
  };

  if (!signed) {
    return (
      <>
        <div className={style.container_login}>
          <form onSubmit={userLogin} className={style.form}>
            <h2 className={style.form_title}>Bem vindo ao InstaPet</h2>
            <div className={style.form_div_inputs}>
              <label className={style.label}>Email</label>
              <input
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                className={style.input}
              />
            </div>
            <div className={style.form_div_inputs}>
              <label className={style.label}>Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
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
      </>
    );
  } else {
    return <Navigate to={`/home`} />;
  }
};
