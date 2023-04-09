import { useContext, useState, useEffect, useRef } from "react";
import { Navigate, Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext.jsx";
import { Resize } from "../utils";

import { inprogress } from "../assents/images";
import "../styles/signup.css";

export const Signup = () => {
  const { signed, Signup } = useContext(AuthContext);

  const [InProgressVisivle, setInProgressVisible] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [imgUser, setImgUser] = useState("");

  useEffect(() => {
    if (imgUser === "" || imgUser === null) {
      setPreview(null);
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };

      if (!imgUser) {
        setPreview(null);
      } else {
        reader.readAsDataURL(imgUser);
      }
    }
  }, [imgUser]);

  const newUser = (e) => {
    e.preventDefault();

    setInProgressVisible(true);

    Resize(imgUser)
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

        setInProgressVisible(false);
      })
      .catch((error) => {
        setInProgressVisible(false);
        return error;
      });
  };

  if (!signed) {
    return (
      <>
        <main className="register_main">
          <div className="container_form_signup">
            <form className="form_signup" onSubmit={newUser}>
              {preview ? (
                <img
                  className="register_avatar"
                  alt="avatar"
                  src={preview}
                  style={{ objectFit: "cover" }}
                  onClick={() => {
                    fileInputRef.current.value = "";
                    setImgUser("");
                  }}
                />
              ) : (
                <button
                  type="button"
                  className="register_avatar"
                  onClick={(event) => {
                    event.preventDefault();
                    fileInputRef.current.click();
                  }}
                ></button>
              )}

              <input
                className="inputImg"
                type="file"
                style={{ display: "none" }}
                ref={fileInputRef}
                accept="image/*"
                onChange={(event) => setImgUser(event.target.files[0])}
              />
              <input
                type="text"
                placeholder="name"
                className="register_input"
                onChange={(e) => setName(e.target.value)}
                id="name"
                maxLength={40}
                minLength={2}
                required={true}
                name="name"
              />
              <input
                type="text"
                placeholder="username"
                className="register_input"
                minLength={4}
                maxLength={20}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                required={true}
                name="username"
              />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="register_input"
                id="cadEmail"
                required={true}
                name="email"
              />
              <input
                type="password"
                placeholder="Password"
                className="register_input"
                onChange={(e) => setPassword(e.target.value)}
                id="cadPassword"
                required={true}
                name="password"
              />
              <input
                type="password"
                placeholder="Digite novamente sua senha"
                onChange={(e) => setConfirmPass(e.target.value)}
                className="register_input"
                required={true}
                id="confirmPass"
                name="confirmPass"
              />
              <Link className="link_login" to={"/login"}>
                <p>login</p>
              </Link>
              <button className="btn_cadastro" type={"submit"}>
                Cadastrar
              </button>
            </form>
          </div>
          {InProgressVisivle && (
            <>
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxSizing: "content-box",
                  background: "black",
                  opacity: "65%",
                  zIndex: "4",
                  // transform: props.transform,
                }}
              >
                <img
                  style={{
                    width: "35px",
                    height: "35px",
                    animation: "loading 1s linear infinite 0ms",
                  }}
                  src={inprogress}
                />
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