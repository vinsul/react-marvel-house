import React from "react";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  return (
    <header>
      <div onClick={() => history.push("/")}>LOGO</div>
      <div>
        <nav onClick={() => history.push("/characters")}>CHARACTERS</nav>
        <nav>COMICS</nav>
        <nav>FAVORITES</nav>
      </div>
    </header>
  );
};

export default Header;
