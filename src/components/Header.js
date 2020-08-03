import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import MarvelLogo from "../assets/images/logo-marvel.png";

const Header = () => {
  const tokenFromCookies = Cookies.get("userToken");
  const nameFromCookies = Cookies.get("userName");

  let newState;
  if (tokenFromCookies) {
    newState = { token: tokenFromCookies };
  } else {
    newState = null;
  }

  const [user, setUser] = useState(newState);

  const history = useHistory();

  return (
    <header>
      <div className="header">
        <div className="header-top container">
          <img
            alt="marvel-logo"
            src={MarvelLogo}
            onClick={() => history.push("/")}
          />
          <div>
            <FontAwesomeIcon icon={faUser} size="2x" />
            {user === null ? (
              <Link to="/log_in">LOG IN</Link>
            ) : (
              <>
                <div>Welcome {nameFromCookies}</div>
                <button
                  onClick={() => {
                    Cookies.remove("userToken");
                    Cookies.remove("userName");

                    setUser(null);

                    history.push("/");
                  }}
                >
                  LOG OUT
                </button>
              </>
            )}
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
