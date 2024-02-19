import React from "react";
import { useNavigate } from "react-router-dom";

function Container() {
  const navigate = useNavigate();
  return (
    <div class="container">
      {/* <img src="/assets/logo.png" alt="logo" className="logo" /> */}
      <form action="/login">
        <button onClick={() => navigate("/login")}>Log in</button>
      </form>
      <form action="/signup">
        <button onClick={() => navigate("/signup")}>Sign up</button>
      </form>
    </div>
  );
}

export default Container;
