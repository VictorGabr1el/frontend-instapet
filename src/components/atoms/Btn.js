export const Btn = (props) => {
  return (
    <>
      <button id={props.class} type={props.type} onClick={props.onClick}>
        {props.txt}
      </button>
    </>
  );
};
