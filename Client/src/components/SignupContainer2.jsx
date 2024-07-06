import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignupOperationStatus from "./SignupOperationStatus";

function SignupContainer2(props) {
  const [formData, setFormData] = React.useState({});
  const [operationState, setOperationState] = React.useState("");
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await fetch(
        // "http://localhost:5001/api/endpoint/signup",
        "https://springbootbackend-production-4c75.up.railway.app/user/register",
        {
          method: "POST", // Assuming you are sending a POST request, adjust if necessary
          headers: {
            "Content-Type": "application/json", // Adjust the content type based on your needs
          },
          body: JSON.stringify({
            ...formData,
          }),
        }
      );
      // Handle the response from the server here
      const responseJson = await response.json();
      console.log(responseJson);

      setOperationState(
        <SignupOperationStatus
          setOperationState={setOperationState}
          success={responseJson.status}
          msg={responseJson.message}
          btnText={responseJson.status ? "log in" : "close"}
        />
      );
    } catch (error) {
      // Handle any errors that occurred during the request
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      // id: userID,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "username") {
      props.updateNavText(e.target.value);
    }
  };
  return (
    <div class="signup-container">
      {/* <img src="/assets/logo.png" alt="bankLogo" className="logo" /> */}
      <form action="/api/endpoint/signup" method="POST" onSubmit={handleSubmit}>
        <p>Full Name</p>
        <input
          class="signup-input change__colors"
          type="text"
          name="username"
          id="username"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <p>Email</p>
        <input
          class="signup-input change__colors"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <p>Set a PIN</p>
        <input
          class="signup-input change__colors"
          type="password"
          name="password"
          id="password"
          placeholder="Enter a PIN"
          value={formData.password}
          onChange={handleInputChange}
        />
        <p>Current Balance</p>
        <input
          class="signup-input change__colors"
          type="number"
          name="balance"
          id="balance"
          placeholder="Enter your current Balance"
          value={formData.balance}
          onChange={handleInputChange}
        />
        <button type="submit" class="signup-btn form__btn form__btn--transfer">
          &rarr;
        </button>
      </form>
      {operationState}
    </div>
  );
}

export default SignupContainer2;
