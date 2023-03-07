import { useContext, useState } from "react";
import { AuthContext } from "../../context";
import { api } from "../../services/api";

export const useModalDeletePost = () => {
  const { updateDataPage } = useContext(AuthContext);
  const [isOpenModalDeletePost, setIsOpenModalDeletePost] = useState(false);

  let PostId;

  async function OpenModalDeletePost(postId) {
    await setIsOpenModalDeletePost(true);
    PostId = postId;
  }

  function DeletePost() {
    const token = localStorage.getItem("@Auth:token");

    if (PostId) {
      api
        .delete(`post/${PostId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const body = document.querySelector("body");
          body.style.overflow = "";

          setIsOpenModalDeletePost(false);
          updateDataPage(response.data);
        });
    }
  }

  const ModalDeletePost = () => {
    return (
      <>
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "3",
          }}
        >
          <div
            onClick={() => {
              const body = document.querySelector("body");
              body.style.overflow = "";

              setIsOpenModalDeletePost(false);
            }}
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
              width: "400px",
              height: "200px",
              background: "white",
              borderRadius: "10px",
            }}
          >
            <div
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
                  display: "flex",
                  fontWeight: "600",
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
                onClick={DeletePost}
                style={{
                  background: "none",
                  height: "25%",
                  border: "none",
                  borderTop: "solid 1px #a7a7a7",
                  borderBottom: "solid 1px #a7a7a7",
                  color: "red",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Excluir
              </button>
              <button
                onClick={() => {
                  const body = document.querySelector("body");
                  body.style.overflow = "";

                  setIsOpenModalDeletePost(false);
                }}
                style={{
                  height: " 25%",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return {
    ModalDeletePost,
    OpenModalDeletePost,
  };
};
