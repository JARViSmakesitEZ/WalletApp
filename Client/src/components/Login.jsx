import React from "react";
import LoginForm from "./LoginForm";
import Navtext from "./Navtext";

function Login() {
  return (
    <nav>
      <Navtext text="Welcome to LIB ." />
      <div id="logo">
        <img src="/assets/logo.png" alt="bankLogo" />
      </div>
      <LoginForm />
    </nav>
  );
}

export default Login;
