import { useContext } from "react";
import { StateContext } from "../../context";

import { erro } from "../../assents/images";
import style from "./ModalError.module.css";

export const ModalError = (props) => {
  const { error, OpenModalError } = useContext(StateContext);

  return (
    <div className={style.ModalError}>
      <div className={style.div_main}>
        <div className={style.div_error_icon}>
          <img className={style.icon_error} src={erro} alt="icon error" />
        </div>
        <h3 className={style.message_error}>
          {props.errorMessage
            ? props.errorMessage.response.data.message
            : error}
        </h3>
      </div>
      <button
        style={props.style}
        className={style.btn_close}
        onClick={() =>
          props.errorMessage ? props.btnClose() : OpenModalError(false)
        }
      />
    </div>
  );
};
