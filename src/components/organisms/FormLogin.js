import { useContext, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function FormLogin() {
  const Login = async () => {
    const minhaDiv2 = await document.querySelector("#newEnter");

    console.log(minhaDiv2);
    minhaDiv2.classList.remove("container__form", "container--signin");
    minhaDiv2.classList.add("new-style");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Signin, signed } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

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
        <div id="newEnter" className="container__form container--signin">
          <form onSubmit={userLogin} className="form" id="form2">
            <h2 className="form__title">Bem vindo ao InstaPet</h2>
            <input
              id="loginEmail"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required={true}
              placeholder="Email"
              className="input"
            />
            <input
              id="loginPassword"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required={true}
              placeholder="Password"
              className="input"
            />
            <Link href="#" className="link">
              Esqueci a senha?
            </Link>
            <input
              id="btnLogin"
              className="btn"
              type="submit"
              value="Acessar"
            />
            <button id="meuid" onClick={Login} className="btn">
              Cadastrar
            </button>
          </form>
        </div>
      </>
    );
  } else {
    return <Navigate to={`/home`} />;
  }
}

export default FormLogin;
