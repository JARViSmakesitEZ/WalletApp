import React from "react";
import SignupContainer2 from "./SignupContainer2";
import Navbar from "./Navbar";

function Signup2() {
  const [navtext, setNavtext] = React.useState("Welcome to LIB .");
  function updateNavText(info) {
    if (info) {
      setNavtext(`Hello ${info} .`);
    }
  }
  return (
    <div>
      <Navbar text={navtext} />
      <SignupContainer2 updateNavText={updateNavText} />
    </div>
  );
}

export default Signup2;
