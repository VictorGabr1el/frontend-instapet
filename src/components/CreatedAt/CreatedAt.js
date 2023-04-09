import CalcData from "./utils";
import style from "./CreatedAt.module.css";

export const CreatedAt = (props) => {
  return (
    <div className={style.createdAt}>
      <p>HÁ {CalcData(props.created)}</p>
    </div>
  );
};
