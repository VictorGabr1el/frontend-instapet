import { useState } from "react";

import { loading as image } from "../../assents/images";
import style from "./Loading.module.css";

export const useLoading = () => {
  const [loading, setLoading] = useState(true);

  const Loading = () => {
    return (
      <>
        <div className={style.div_loading}>
          <img className={style.img_loading} src={image}></img>
        </div>
      </>
    );
  };

  return {
    Loading,
    loading,
    setLoading: (boolean) => setLoading(boolean),
  };
};
