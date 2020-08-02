import React from "react";

const Footer = ({ attributionText }) => {
  return (
    <footer>
      <div>
        <span>Made with</span>
        <a target="blank" href="https://fr.reactjs.org/">
          React
        </a>
        <span>at </span>
        <a target="blank" href="https://www.lereacteur.io/">
          Le Reacteur
        </a>
        <span> by </span>
        <a
          target="blank"
          href="https://www.linkedin.com/mwlite/in/vanessa-insulaire-8939651b"
        >
          Vanessa INSULAIRE
        </a>
      </div>    
      <div>{attributionText}</div>
    </footer>
  );
};

export default Footer;
