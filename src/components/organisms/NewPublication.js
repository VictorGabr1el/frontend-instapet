import { storage } from "../../services/firebase.js";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  connectStorageEmulator,
} from "firebase/storage";
import { useState, useEffect, useRef, useContext } from "react";
import { api } from "../../services/api";
import { AuthContext } from "../../context/AuthContext.jsx";

function NewPublication() {
  const { user, updatetimeline } = useContext(AuthContext);

  const [image, setImage] = useState();
  const [preview, setPreview] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const fileInputRef = useRef();
  const [legend, setLegend] = useState(null);

  const closeModal = async (e) => {
    e.preventDefault();
    setPreview(null);
    setImgURL("");

    const div = await document.querySelector(".new_publication_enable");
    div.classList.replace("new_publication_enable", "new_publication_disable");
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

  const Submit = (event) => {
    event.preventDefault();

    const storageRef = ref(storage, `images/${image.name}`);

    const upload = uploadBytesResumable(storageRef, image);

    getDownloadURL(upload.snapshot.ref)
      .then(async (downloadURL) => {
        setImgURL(downloadURL);

        if (downloadURL) {
          const data = {
            img: downloadURL,
            legend: legend,
          };

          api
            .post(`/user/${user.user_id}/post`, data)
            .then((response) => {
              const result = response.data;
              updatetimeline(result);
            })
            .catch((error) => {
              console.log(error);
            });
        }

        return console.error();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="new_publication_disable">
        <form onSubmit={Submit} className="new_publication_margin">
          <div className="new_publication_title">
            <p>Nova publicação</p>
            <button
              onClick={closeModal}
              className="btn_disable_modal_new_publication"
            >
              X
            </button>
          </div>
          <div className="new_publication_img_post">
            {preview ? (
              <img
                className="renderImg"
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
