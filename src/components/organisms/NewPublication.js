import { useState, useEffect, useRef, useContext } from "react";
import { api } from "../../services/api";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Resize } from "../../services/Resize.js";

function NewPublication() {
  const { updateDataPage } = useContext(AuthContext);

  const [image, setImage] = useState();
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();
  const [legend, setLegend] = useState(null);

  const btnClose = async () => {
    const div = await document.querySelector(".new_publication_enable");
    div.classList.replace("new_publication_enable", "new_publication_disable");

    const body = await document.querySelector("body");
    body.style.overflow = "";

    const opac = await document.querySelector(".enable_opacity");
    opac.style.opacity = "";
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        console.log(image);
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

    console.log(img);

    img.onload = function () {
      const ww =
        image.size < 513051
          ? (this.width / 100) * 95
          : image.size >= 513051 && image.size < 613051
          ? (this.width / 100) * 90
          : image.size >= 613051 && image.size < 893051
          ? (this.width / 100) * 80
          : image.size >= 893051 && image.size < 1189990
          ? (this.width / 100) * 50
          : (this.width / 100) * 40;
      console.log(ww);

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
              console.log(response);
              updateDataPage(response.data);
              btnClose();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };

  return (
    <>
      <div className="new_publication_disable">
        <div className="nnn" onClick={btnClose}></div>
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
}

export default NewPublication;
