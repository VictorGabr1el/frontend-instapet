import { useState, useRef, useContext } from "react";
import { AuthContext, StateContext } from "../../context";
import { Api } from "../../services/Api";
import { Resize } from "../../utils";
import { usePreview } from "../../hooks";

import { inprogress } from "../../assents/images";
import style from "./NewPublication.module.css";

export const NewPublication = () => {
  const { updateDataPage } = useContext(AuthContext);
  const { OpenModalNewPublication, OpenModalError } = useContext(StateContext);
  const { InputImg, image } = usePreview();

  const [sendingPublication, setSendingPublication] = useState(false);
  const legendRef = useRef();

  function Submit(e) {
    e.preventDefault();
    setSendingPublication(true);
    const token = localStorage.getItem("@Auth:token");

    Resize(image)
      .then((downloadURL) => {
        Api.post(
          "/post",
          { img: downloadURL, legend: legendRef.current.value },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then(() => {
            updateDataPage();
            setSendingPublication(false);
            OpenModalNewPublication(false);
          })
          .catch((error) => {
            setSendingPublication(false);
            OpenModalError(true, error);
            OpenModalNewPublication(false);
            return;
          });
      })
      .catch((error) => {
        setSendingPublication(false);
        return OpenModalError(true, error);
      });
  }

  return (
    <div className={style.Modal_New_Publication}>
      {!sendingPublication && (
        <div
          className={style.btn_close}
          onClick={() => OpenModalNewPublication(false)}
        ></div>
      )}
      <form onSubmit={Submit} className={style.form}>
        <div className={style.form_title}>
          <p className={style.form_title_p}>Nova publicação</p>
        </div>
        <div className={style.form_input_img_post}>
          <InputImg />
        </div>
        <div className={style.form_input_legend}>
          <input
            className={style.legend}
            autoComplete="off"
            type="text"
            name="legend"
            ref={legendRef}
            placeholder="Adicione uma legenda..."
          />
        </div>
        <div className={style.div_submit}>
          <button
            className={style.button_submit}
            type="submit"
            placeholder="publicar"
          >
            publicar
          </button>
        </div>
      </form>
      {sendingPublication && (
        <div className={style.sending_publication}>
          <img
            className={style.sending_publication_img}
            alt="progress icon"
            src={inprogress}
          />
        </div>
      )}
    </div>
  );
};
