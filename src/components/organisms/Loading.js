import loading from "../../img/loading.svg";
import "../../styles/loading.css";

export const Loading = () => {
  return (
    <>
      <div className="div_loading">
        <img className="img_loading" src={loading}></img>
      </div>
    </>
  );
};
