import { useState, useRef, useContext } from "react";

import { Api } from "../../services/Api";
import { AuthContext, StateContext } from "../../context";
import { Resize } from "../../services/Resize.js";

import { inprogress } from "../../assents/images";
import { usePreview } from "../../hooks/usePreview";

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
    <>
      <div className="new_publication_enable">
        {!sendingPublication && (
          <div
            className="btn_close"
            onClick={() => OpenModalNewPublication(false)}
          ></div>
        )}
        <form onSubmit={Submit} className="new_publication_margin">
          <div className="new_publication_title">
            <p>Nova publicação</p>
          </div>
          <div className="new_publication_img_post">
            <InputImg />
          </div>
          <div className="new_publication_legenda">
            <input
              type="text"
              name="legend"
              ref={legendRef}
              placeholder="Adicione uma legenda..."
            />
          </div>
          <div className="new_publication_publicar">
            <button type="submit" placeholder="publicar">
              publicar
            </button>
          </div>
        </form>
        {sendingPublication && (
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
        )}
      </div>
    </>
  );
};
