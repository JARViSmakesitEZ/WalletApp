import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginOperationStatus from "./LoginOperationStatus";

function LoginForm2(props) {
  const Navigate = useNavigate();
  const [formData, setFormData] = React.useState({});
  const [operationState, setOperationState] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const loginStatus = await fetch(
        "http://localhost:5001/api/endpoint/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // add any additional headers if needed
          },
          body: JSON.stringify({ formData }),
        }
      );
      // Handle the response from the server here
      const json = await loginStatus.json();
      const userData = json.user;
      const status = json.status;

      if (status) {
        Navigate("/home", { state: userData });
      } else {
        // Handle the case when login was unsuccessful
        setOperationState(
          <LoginOperationStatus
            setOperationState={setOperationState}
            btnText="try again"
            msg={json.msg}
          />
        );
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.log("error:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "username") {
      props.updateNavText(e.target.value);
    }
  };
  return (
    <div>
      <form
        class="login"
        id="loginForm"
        action="/api/endpoint"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="username"
          class="login__input login__input--user change__colors"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="PIN"
          maxlength="4"
          class="login__input login__input--pin change__colors"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit" class="login__btn">
          &rarr;
        </button>
      </form>
      {operationState}
    </div>
  );
}

export default LoginForm2;
