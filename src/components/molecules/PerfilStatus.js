export const PerfilStatus = (props) => {
  return (
    <>
      <div className="status">
        <img src={props.avatar} alt="" />
        <p>{props.username}</p>
      </div>
    </>
  );
};
