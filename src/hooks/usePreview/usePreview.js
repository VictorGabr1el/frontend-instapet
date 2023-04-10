import { useEffect, useState, useRef } from "react";
import style from "./usePreview.module.css";

function usePreview(props) {
  const fileInputRef = useRef();
  const [image, setImage] = useState();
  const [preview, setPreview] = useState(null);
  const [render, setRender] = useState(true);

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

  const InputImg = (props) => {
    useEffect(() => {
      if (preview) {
        setRender(false);
      }
    }, [preview]);

    const buttonStyle = {
      width: "100%",
      minHeight: "220px",
      background: "none",
      border: "none",
      backgroundImage: "url(../../assents/images/avatar-person.svg)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      opacity: "70%",
      backgroundSize: "50px",
      cursor: "pointer",
    };

    const imgStyle = {
      width: "100%",
      height: "100%",
      verticalAlign: "baseline",
      objectFit: "cover",
      cursor: "pointer",
    };

    return (
      <>
        {props.preview && !preview && render ? (
          <img
            src={props.preview}
            className={style.renderImg}
            alt=""
            style={props.style}
            onClick={(event) => {
              event.preventDefault();
              fileInputRef.current.click();
            }}
          />
        ) : preview ? (
          <img
            className={style.renderImg}
            alt=""
            style={props.style}
            src={preview}
            onClick={() => {
              fileInputRef.current.value = "";
              setImage(null);
            }}
          />
        ) : (
          <button
            type="button"
            className={style.btnNewImg}
            style={props.style}
            onClick={(event) => {
              event.preventDefault();
              fileInputRef.current.click();
            }}
          ></button>
        )}

        <input
          className={style.inputImg}
          type="file"
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
      </>
    );
  };
  return { InputImg, image };
}

export default usePreview;
