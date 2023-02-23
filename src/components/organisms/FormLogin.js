import { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

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
        <div className="container_signin">
          <form onSubmit={userLogin} className="form" id="form2">
            <h2 className="form__title">Bem vindo ao InstaPet</h2>
            <label>Email</label>
            <input
              id="loginEmail"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required={true}
              className="input"
            />
            <label>Password</label>
            <input
              id="loginPassword"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required={true}
              className="input"
            />
            <Link href="#" className="link">
              Esqueci a senha?
            </Link>
            <button className="btn" type="submit">
              Acessar
            </button>
            <Link to={"/register"} className="btn_query_width">
              <p>Cadastrar</p>
            </Link>
          </form>
        </div>
      </>
    );
  } else {
    return <Navigate to={`/home`} />;
  }
};
