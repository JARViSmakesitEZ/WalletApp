import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CredentialsCard(props) {
  console.log(props.username);
  const Navigate = useNavigate();
  const [formData, setFormData] = React.useState({ username: props.username });
  console.log(formData);

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();

    try {
      console.log(formData);
      const response = await fetch(
        "http://localhost:5001/api/endpoint/changecredentials",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, token: document.cookie }),
        }
      );

      // Handle the response from the server here
      const data = await response.json();
      if (data.message === "Unauthorized") {
        alert("Session timeout, please login/signup");
        window.location.href = "/";
      }
      console.log(data);
      if (data.status) {
        // Assuming a successful response contains a "success" property
        console.log("successful");
        // Navigate to the home page or handle the navigation as needed
        Navigate("/");
      } else {
        console.log("failed");
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal-overlay">
      <div className="operation operation--credentials card hidden">
        <h2>Change Credentials</h2>
        <form className="form form--transfer" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form__input form__input--to"
            onChange={handleInputChange}
            name="newusername"
            value={formData.newusername}
          />
          <input
            type="number"
            className="form__input form__input--amount"
            onChange={handleInputChange}
            name="password"
            value={formData.password}
          />
          <button className="form__btn form__btn--transfer">&rarr;</button>
          <label className="form__label">username</label>
          <label className="form__label">PIN</label>
        </form>
      </div>
      <button className="closeButton" onClick={() => props.setCardState("")}>
        close
      </button>
    </div>
  );
}

export default CredentialsCard;
