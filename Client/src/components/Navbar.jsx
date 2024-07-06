import React from "react";
import Navtext from "./Navtext";

function Navbar(props) {
  return (
    <nav>
      <Navtext text={props.text} />
      <div id="logo">
        <img src="./assets/logo.png" alt="bankLogo" />
      </div>
    </nav>
  );
}

export default Navbar;
