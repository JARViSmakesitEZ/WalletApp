import React from "react";
import LoginForm2 from "./LoginForm2";
import Navtext from "./Navtext";

function Login2() {
  const [navtext, setNavtext] = React.useState("Welcome to Food Park .");
  function updateNavText(info) {
    if (info) {
      setNavtext(`Welcome back ${info} .`);
    } else {
      setNavtext("Welcome to Food Park .");
    }
  }
  return (
    <nav>
      <Navtext text={navtext} />
      <div id="logo">
        <img src="/assets/logo.png" alt="bankLogo" />
      </div>
      <LoginForm2 updateNavText={updateNavText} />
    </nav>
  );
}

export default Login2;
