function Btn(props) {
  return (
    <>
      <button className={props.class} onClick={props.click}>
        {props.txt}
      </button>
    </>
  );
}

export default Btn;
