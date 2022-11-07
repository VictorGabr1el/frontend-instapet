function Btn(props) {
  return (
    <>
      <button id={props.class} onClick={props.click}>
        {props.txt}
      </button>
    </>
  );
}

export default Btn;
