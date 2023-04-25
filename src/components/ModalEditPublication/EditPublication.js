import { useContext, useEffect, useRef, useState } from "react";

import { AuthContext } from "../../context";
import { Api } from "../../services/Api";
import { Resize } from "../../utils";
import { usePreview } from "../../hooks";

import { useLoading, useInProgress } from "../";
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

  async function Edit(e) {
    e.preventDefault();

    IsInProgress(true);
    const legend = legendRef.current.value;
    const token = localStorage.getItem("@Auth:token");

    if (!image) {
      Api({
        url: `/post/${props.PostId}`,
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { legend },
      })
        .then(() => {
          updateDataPage();
          IsInProgress(false);
          props.btn();
        })
        .catch((e) => {
          console.log(e);
          IsInProgress(false);
        });
    } else {
      const ImgUrl = await Resize(image);

      const data = {
        legend: legend !== post.legend && legend,
        ImgUrl,
      };
      console.log(data);

      Api({
        url: `/post/${props.PostId}`,
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { data },
      })
        .then(() => {
          updateDataPage();
          IsInProgress(false);
          props.btn();
        })
        .catch((e) => {
          console.log(e);
          IsInProgress(false);
        });
    }
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
                  maxLength={400}
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
