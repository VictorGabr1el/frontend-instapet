import { useState } from "react";

const ModalDeletePost = () => {
  const [isOPenModalDeletePost, setIsOpenModalDeletePost] = useState(false);

  return (
    <>
      <div>
        <div
          style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            zIndex: "0",
            background: "black",
            opacity: "60%",
          }}
        />
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            height: "30%",
            background: "white",
            borderRadius: "10px",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              textAlign: "center",
              justifyContent: "space-evenly",
              width: "98%",
              marginInline: "auto",
            }}
          >
            <h2
              style={{
                height: "30%",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Excluir Publicação
            </h2>
            <p style={{ height: "20%" }}>
              Tem certeza de que deseja excluir essa publicação?
            </p>
            <button
              style={{
                background: "none",
                height: "25%",
                border: "none",
                borderTop: "solid 1px #a7a7a7",
                borderBottom: "solid 1px #a7a7a7",
                color: "red",
              }}
            >
              Excluir
            </button>
            <button
              style={{ height: " 25%", border: "none", background: "none" }}
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
