import ImgPerfil from "../atoms/ImgPerfil";
import Btn from "../atoms/Btn";

function UserSugestao(props) {
  return (
    <>
      <div className="novas-sugestoes">
        <div>
          <ImgPerfil avatar={props.avatar} />
          <p>{props.username}</p>
        </div>
        <Btn txt={"seguir"} />
      </div>
    </>
  );
}

export default UserSugestao;
