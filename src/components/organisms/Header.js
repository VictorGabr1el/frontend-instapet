import { Search } from "../molecules";
import { Title } from "../atoms";

export const Header = (props) => {
  return (
    <>
      <header className="class_header">
        <nav className="class_nav">
          <Title />
          <Search avatar={props.user.avatar} id={props.user.id} />
        </nav>
      </header>
    </>
  );
};
