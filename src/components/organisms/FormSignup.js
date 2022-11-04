import { useContext, useState } from "react";
import { storage } from "../../services/firebase.js";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { AuthContext } from "../../context/AuthContext";
import { api } from "../../services/api";

function FormSingup() {
  const divLogup = async (event) => {
    const DivEntrar = document.getElementById("newEnter");
    DivEntrar.classList.remove("new-style");
    DivEntrar.classList.add("container__form", "container--signin");
  };

  const { Signin, Signup } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [imgUser, setImgUser] = useState("");

  const newUser = async (e) => {
    e.preventDefault();

    const storageRef = ref(storage, `images/${imgUser.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imgUser);

    getDownloadURL(uploadTask.snapshot.ref)
      .then(async (downloadURL) => {
        setImgUser(downloadURL);

        const data = {
          name,
          username,
          avatar: downloadURL,
          email,
          password,
          confirmPass,
        };

        try {
          await Signup(data);
        } catch (error) {
          return error;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container__form container--signup">
        <form onSubmit={newUser} className="form" id="form1">
          <h2 className="form__title">Cadastre-se</h2>
          <input
            type="text"
            placeholder="name"
            className="input"
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
            className="input"
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
            className="input"
            id="cadEmail"
            required={true}
            name="email"
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            id="cadPassword"
            required={true}
            name="password"
          />
          <input
            type="password"
            placeholder="Digite novamente sua senha"
            onChange={(e) => setConfirmPass(e.target.value)}
            className="input"
            required={true}
            id="confirmPass"
            name="confirmPass"
          />
          <input
            type="file"
            className="input"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files[0];
              if (file && file.type.substr(0, 5) === "image") {
                setImgUser(file);
              } else {
                setImgUser(null);
              }
            }}
          />

          <input
            className="btn"
            type={"submit"}
            value="Cadastrar"
            id="btnCadastro"
          />
          <button id="meuid2" onClick={divLogup} className="btn">
            Entrar
          </button>
        </form>
      </div>
    </>
  );
}

export default FormSingup;
