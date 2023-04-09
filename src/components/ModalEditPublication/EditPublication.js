import { useContext, useEffect, useRef, useState } from "react";
import { Api } from "../../services/Api";

import { useLoading } from "../Loading";
import { usePreview } from "../../hooks/usePreview";
import { useInProgress } from "../InProgress";
import { AuthContext } from "../../context";
import { Resize } from "../../services/Resize";

import style from "./EditPublication.module.css";

export const EditPublication = (props) => {
  const { updateDataPage } = useContext(AuthContext);
  const { Loading, loading, setLoading } = useLoading();
  const { InProgress, IsInProgress } = useInProgress();
  const { InputImg, image } = usePreview();

  const legendRef = useRef();
  const [post, setPost] = useState([]);

  useEffect(() => {
    Api.get(`/post/${props.PostId}`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  function Edit(e) {
    e.preventDefault();

    IsInProgress(true);
    const legend = legendRef.current.value;
    const token = localStorage.getItem("@Auth:token");

    Resize(image)
      .then((ImgUrl) => {
        Api({
          url: `/post/${props.PostId}`,
          method: "put",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { legend, ImgUrl },
        }).then((response) => {
          updateDataPage(response.data);
          IsInProgress(false);
          props.btn();
        });
      })
      .catch((e) => {
        console.log(e);
        IsInProgress(false);
      });
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className={style.edit_publication}>
        {!InProgress ? (
          <>
            <div className={style.btn_close} onClick={props.btn}></div>
            <form
              className={style.edit_publication_form}
              key={post.id}
              onSubmit={Edit}
            >
              <div className={style.edit_publication_title}>
                <p className={style.edit_publication_title_p}>
                  Editar publicação
                </p>
              </div>
              <div className={style.edit_publication_img_post}>
                <InputImg preview={post.img_post} />
              </div>
              <div className={style.edit_publication_legend}>
                <input
                  className={style.edit_publication_legend_input}
                  type="text"
                  ref={legendRef}
                  name="legend"
                  defaultValue={post.legend}
                  placeholder="Adicione uma legenda..."
                />
              </div>
              <div className={style.edit_publication_btn}>
                <button
                  className={style.edit_publication_button}
                  type="submit"
                  placeholder="publicar"
                >
                  publicar
                </button>
              </div>
            </form>
          </>
        ) : (
          <InProgress />
        )}
      </div>
    </>
  );
};
