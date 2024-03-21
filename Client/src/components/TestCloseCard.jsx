import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CloseCard(props) {
  const [formData, setFormData] = React.useState({
    username: "",
    pin: "",
  });
  const Navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      token: document.cookie,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const closeAccountStatus = await axios.post(
        "http://localhost:5001/api/endpoint/close",
        { ...formData }
      );
      if (closeAccountStatus.message === "Unauthorized") {
        alert("Session timeout, please login/signup");
        window.location.href = "/";
      }

      // Handle the response from the server here
      // const closeAccountData = closeAccountStatus.data;

      // if (closeAccountData) {
      // Assuming a successful response contains a "success" property
      // console.log("Account closed successfully");
      // Redirect to the login page after closing the account
      Navigate("/Login2");
      // } else {
      // console.log("Account closure failed");
      // }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error(1234);
    }
  };

  return (
    <div className="modal-overlay">
      <div class="operation operation--close card hidden">
        <h2>Close account</h2>
        <form class="form form--close" onSubmit={handleSubmit}>
          <input
            type="text"
            class="form__input form__input--user"
            name="username"
            onChange={handleInputChange}
          />
          <input
            type="password"
            maxlength="6"
            class="form__input form__input--pin"
            name="pin"
            onChange={handleInputChange}
          />
          <button class="form__btn form__btn--close">&rarr;</button>
          <label class="form__label">username</label>
          <label class="form__label">PIN</label>
        </form>
      </div>
      <button className="closeButton" onClick={() => props.setCardState("")}>
        close
      </button>
    </div>
  );
}

export default CloseCard;
