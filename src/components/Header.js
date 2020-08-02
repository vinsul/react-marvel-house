import React from "react";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import MarvelLogo from "../assets/images/logo-marvel.png";

const Header = () => {
  const history = useHistory();

  return (
    <header>
      <div className="header" onClick={() => history.push("/")}>
        <div className="header-top container">
          <img alt="marvel-logo" src={MarvelLogo} />
          <div>
            <FontAwesomeIcon icon={faUser} size="2x" />
            <div>Se connecter</div>
          </div>
        </div>
        <div className="header-nav-bar">
          <div onClick={() => history.push("/characters")}>CHARACTERS</div>
          <div onClick={() => history.push("/comics")}>COMICS</div>
          <div onClick={() => history.push("/favorites")}>FAVORITES</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
