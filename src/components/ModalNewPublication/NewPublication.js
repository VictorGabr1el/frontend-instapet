import { useState, useRef, useContext } from "react";

import { Api } from "../../services/Api";
import { AuthContext, StateContext } from "../../context";
import { Resize } from "../../services/Resize.js";
import { usePreview } from "../../hooks/usePreview";

import { inprogress } from "../../assents/images";
import style from "./NewPublication.module.css";

export const NewPublication = () => {
  const { updateDataPage } = useContext(AuthContext);
  const { OpenModalNewPublication } = useContext(StateContext);
  const { InputImg, image } = usePreview();

  const [sendingPublication, setSendingPublication] = useState(false);
  const legendRef = useRef();

  function Submit(e) {
    e.preventDefault();

    setSendingPublication(true);

    Resize(image)
      .then((downloadURL) => {
        const data = {
          img: downloadURL,
          legend: legendRef.current.value,
        };

        const token = localStorage.getItem("@Auth:token");

        Api.post("/post", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            updateDataPage(response.data);
            setSendingPublication(false);
            OpenModalNewPublication(false);
          })
          .catch((error) => {
            setSendingPublication(false);
            OpenModalNewPublication(false);
            return error;
          });
      })
      .catch((error) => {
        setSendingPublication(false);
        OpenModalNewPublication(false);
        return error;
      });
  }

  return (
    <div className={style.Modal_Publication}>
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
          <img className={style.sending_publication_img} src={inprogress} />
        </div>
      )}
    </div>
  );
};
