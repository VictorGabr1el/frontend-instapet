function Btn(props) {
  return (
    <>
      <button className="btn_global" onClick={props.click}>
        {props.txt}
      </button>
    </>
  );
}

export default Btn;
