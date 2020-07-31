import React from "react";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  return (
    <header>
      <div onClick={() => history.push("/")}>LOGO</div>
      <div>
        <nav onClick={() => history.push("/characters")}>CHARACTERS</nav>
        <nav onClick={() => history.push("/comics")}>COMICS</nav>
        <nav onClick={() => history.push("/favorites")}>FAVORITES</nav>
      </div>
    </header>
  );
};

export default Header;
