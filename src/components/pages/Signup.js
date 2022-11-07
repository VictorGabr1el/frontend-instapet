import React, { useContext, useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { storage } from "../../services/firebase.js";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

import { AuthContext } from "../../context/AuthContext";
import "../../styles/signup.css";
import { Link } from "react-router-dom";

function Signup() {
  const { Signup, signed } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [imgUser, setImgUser] = useState("");

  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    if (imgUser === "") {
      setPreview(null);
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(imgUser);
    }
  }, [imgUser]);

  const newUser = (e) => {
    e.preventDefault();

    const storageRef = ref(storage, `images/${imgUser.name}`);

    uploadBytes(storageRef, imgUser).then(() => {
      getDownloadURL(storageRef)
        .then((downloadURL) => {
          if (!downloadURL) {
            return console.error();
          } else {
            const data = {
              name,
              username,
              avatar: downloadURL,
              email,
              password,
              confirmPass,
            };
            console.log(downloadURL);

            Signup(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
                  src={preview}
                  style={{ objectFit: "cover" }}
                  onClick={() => {
                    setImgUser(null);
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
