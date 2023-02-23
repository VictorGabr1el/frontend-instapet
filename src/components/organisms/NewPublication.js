import { useState, useEffect, useRef, useContext } from "react";
import { api } from "../../services/api";
import { AuthContext, StateContext } from "../../context";
import { Resize } from "../../services/Resize.js";

export const NewPublication = () => {
  const { updateDataPage } = useContext(AuthContext);
  const { OpenModalNewPost } = useContext(StateContext);

  const [image, setImage] = useState();
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();
  const [legend, setLegend] = useState(null);

  const btnClose = async () => {
    OpenModalNewPost(false);

    const body = await document.querySelector("body");
    body.style.overflow = "";
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const Submit = (e) => {
    e.preventDefault();

    const src = URL.createObjectURL(image);

    const img = new Image();
    img.src = src;

    img.onload = function () {
      const ww =
        image.size < 513051
          ? (this.width / 100) * 95
          : image.size >= 513051 && image.size < 613051
          ? (this.width / 100) * 90
          : image.size >= 613051 && image.size < 893051
          ? (this.width / 100) * 80
          : image.size >= 893051 && image.size < 1189990
          ? (this.width / 100) * 65
          : image.size >= 1189990 && image.size < 1409990
          ? (this.width / 100) * 50
          : (this.width / 100) * 40;

      Resize({ src, ww })
        .then((downloadURL) => {
          const data = {
            img: downloadURL,
            legend: legend,
          };

          const token = localStorage.getItem("@Auth:token");

          api
            .post("/post", data, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              updateDataPage(response.data);
              btnClose();
            })
            .catch((error) => {
              return error;
            });
        })
        .catch((error) => {
          return error;
        });
    };
  };

  return (
    <>
      <div className="new_publication_enable">
        <div className="btn_close" onClick={btnClose}></div>
        <form onSubmit={Submit} className="new_publication_margin">
          <div className="new_publication_title">
            <p>Nova publicação</p>
          </div>
          <div className="new_publication_img_post">
            {preview ? (
              <img
                className="renderImg"
                alt="imagem da postagem"
                src={preview}
                style={{ objectFit: "cover" }}
                onClick={() => {
                  setImage(null);
                }}
              />
            ) : (
              <button
                type="button"
                className="btnNewImg"
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
              onChange={(event) => {
                const file = event.target.files[0];
                if (file && file.type.substr(0, 5) === "image") {
                  setImage(file);
                } else {
                  setImage(null);
                }
              }}
            />
          </div>
          <div className="new_publication_legenda">
            <input
              type="text"
              name="legenda"
              id=""
              onChange={(e) => setLegend(e.target.value)}
              placeholder="Adicione uma legenda..."
            />
          </div>
          <div className="new_publication_publicar">
            <button type="submit" placeholder="publicar">
              publicar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
