import loading from "../../img/loading.svg";
import "../../styles/loading.css";

function Loading() {
  return (
    <>
      <div className="div_loading">
        <img className="img_loading" src={loading}></img>
      </div>
    </>
  );
}

export default Loading;
