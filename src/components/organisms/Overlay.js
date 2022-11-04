function Overlay() {
  const signIn = async () => {
    const container = await document.querySelector(".container");
    container.classList.remove("right-panel-active");
  };

  const signUp = async () => {
    const container = await document.querySelector(".container");
    container.classList.add("right-panel-active");
  };

  return (
    <>
      <div className="container__overlay">
        <div className="overlay">
          <div className="overlay__panel overlay--left">
            <button className="btn" id="signIn" onClick={signIn}>
              Entrar
            </button>
          </div>
          <div className="overlay__panel overlay--right">
            <button className="btn" id="signUp" onClick={signUp}>
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Overlay;
