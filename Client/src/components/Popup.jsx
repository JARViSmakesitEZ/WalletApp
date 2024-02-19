import React from "react";
import Navbar from "./Navbar";

function Popup(props) {
  return (
    <div className="popup_container">
      <div className="popup">
        <img src="/assets/logo.png" alt="logo" className="logo" />
        <button className="close_popup">X</button>
        <div className="popup_message">{props.message}</div>
      </div>
    </div>
  );
}

export default Popup;
