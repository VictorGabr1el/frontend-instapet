import { Search } from "../molecules";
import { Title } from "../atoms";

function Header(props) {
  return (
    <>
      <header className="class_header">
        <nav className="class_nav">
          <Title />
          <Search avatar={props.userSigned.avatar} />
        </nav>
      </header>
    </>
  );
}

export default Header;
