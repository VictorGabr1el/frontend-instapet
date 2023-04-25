import { useContext, useRef } from "react";

import { AuthContext } from "../../context";
import { usePreview } from "../../hooks";
import { Api } from "../../services/Api";

import { useInProgress } from "../";
import style from "./EditProfile.module.css";
import { Resize } from "../../utils";

export const EditProfile = (props) => {
  const { currentUser, updateDataPage } = useContext(AuthContext);
  const { InputImg, image } = usePreview();
  const { InProgress, IsInProgress } = useInProgress();

  const usernameRef = useRef();
  const nameRef = useRef();
  const biographRef = useRef();

  async function EditProfile(e) {
    e.preventDefault();
    IsInProgress(true);
    const token = localStorage.getItem("@Auth:token");

    const username = usernameRef.current.value;
    const name = nameRef.current.value;
    const biograph = biographRef.current.value;

    if (!image) {
      Api({
        url: `/user`,
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          username: username.length > 0 ? username : currentUser.username,
          name: name.length > 0 ? name : currentUser.name,
          avatar: currentUser.avatar,
          // biograph: biograph.length > 0? biograph: currentUser.biograph,
        },
      })
        .then(() => {
          updateDataPage();
          IsInProgress(false);
        })
        .catch((error) => {
          IsInProgress(false);
          alert(error);
        });
    } else {
      const imageUrl = await Resize(image);

      Api({
        url: `/user`,
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          username: username.length > 0 ? username : currentUser.username,
          name: name.length > 0 ? name : currentUser.name,
          avatar: imageUrl,
          // biograph: biograph.length > 0? biograph: currentUser.biograph,
        },
      })
        .then(() => {
          updateDataPage();
          IsInProgress(false);
        })
        .catch((error) => {
          IsInProgress(false);
          alert(error);
        });
    }
  }

  return InProgress ? (
    <InProgress />
  ) : (
    <>
      <div className={style.modal_editprofile}>
        <div className={style.btn_close} onClick={() => props.btn()} />
        <div className={style.modal_size}>
          <form className={style.form} onSubmit={EditProfile}>
            <div>
              <InputImg
                preview={currentUser.avatar}
                style={{
                  width: "120px",
                  height: "120px",
                  verticalAlign: "bottom",
                  objectFit: "cover",
                  cursor: "pointer",
                  border: "solid 1px #959595",
                  borderRadius: "100%",
                  minHeight: "auto",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div className={style.div_input}>
              <label className={style.label}>Username</label>
              <input
                className={style.input}
                type="text"
                minLength={4}
                maxLength={20}
                name="username"
                ref={usernameRef}
              />
            </div>
            <div className={style.div_input}>
              <label className={style.label}>Nome</label>
              <input
                className={style.input}
                ref={nameRef}
                maxLength={40}
                minLength={2}
                type="text"
                name="name"
              />
            </div>
            <div className={style.div_input}>
              <label className={style.label}>Biografia</label>
              <textarea
                className={style.textarea}
                type="text"
                name="biograph"
                ref={biographRef}
              />
            </div>
            <div className={style.div_input}>
              <button className={style.button} type="submit">
                enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};