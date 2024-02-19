import React from "react";

function LoginForm() {
  return (
    <form class="login" id="loginForm" action="/check" method="POST">
      <input
        type="text"
        placeholder="username"
        class="login__input login__input--user"
        name="username"
        id="username"
      />
      <input
        type="password"
        placeholder="PIN"
        maxlength="4"
        class="login__input login__input--pin"
        name="password"
        id="password"
      />
      <button type="submit" class="login__btn">
        &rarr;
      </button>
    </form>
  );
}

export default LoginForm;
