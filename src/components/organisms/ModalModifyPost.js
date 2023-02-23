import { useContext } from "react";
import { StateContext } from "../../context";

export const ModalModifyPost = () => {
  const { OpenModalModifyPost } = useContext(StateContext);
  const btnClose = () => {
    OpenModalModifyPost(false);
  };

  return (
    <>
      <div className="mini_modal_component">
        <div className="btn_close" onClick={btnClose}></div>
        <div className="modal">
          <div className="btn_edit">
            <p>Editar</p>
          </div>

          <div className="btn_delete">
            <p>Excluir</p>
          </div>
        </div>
      </div>
    </>
  );
};
