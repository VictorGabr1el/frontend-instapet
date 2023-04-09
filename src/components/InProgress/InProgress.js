import { useState } from "react";

import { inprogress } from "../../assents/images";
import style from "./InProgress.module.css";

export const useInProgress = () => {
  const [InProgressVisible, setInProgressVisible] = useState(false);

  const InProgress = () => {
    return (
      <>
        <div className={style.inprogress_div}>
          <img className={style.inprogress_img} src={inprogress} />
        </div>
      </>
    );
  };

  return {
    InProgress: InProgressVisible ? InProgress : null,
    IsInProgress: (boolean) => setInProgressVisible(boolean),
  };
};
