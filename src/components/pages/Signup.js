import React, { useContext, useState, useEffect, useRef } from "react";
import { Navigate, Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext.jsx";
import "../../styles/signup.css";
import { Resize } from "../../services/Resize.js";

function Signup() {
  const { signed, Signup } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [imgUser, setImgUser] = useState("");

  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

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
        console.log(imgUser);
      }
    }
  }, [imgUser]);

  const newUser = (e) => {
    e.preventDefault();

    const src = URL.createObjectURL(imgUser);

    const img = new Image();
    img.src = src;

    img.onload = function () {
      const ww =
        imgUser.size > 613051
          ? (this.width / 100) * 50
          : (this.width / 100) * 80;

      console.log(ww, this.width);
      Resize({ src, ww }).then((downloadURL) => {
        const data = {
          name,
          username,
          email,
          avatar: downloadURL,
          password,
          confirmPass,
        };

        console.log(data);
        Signup(data);
      });
    };
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
              <Link className="link_login" to={"/"}>
                <p>fazer login</p>
              </Link>
              <button className="btn_cadastro" type={"submit"}>
                Cadastrar
              </button>
            </form>
          </div>
        </main>
      </>
    );
  } else {
    return <Navigate to={`/home`} />;
  }
}

export default Signup;
