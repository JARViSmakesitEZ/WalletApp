import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CredentialsCard(props) {
  const userData = props.userData;
  console.log(userData);
  const Navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(userData.id!==parseInt(id)){
      alert("wrong user ID.");
      return;
    }

    try {
      const response = await fetch(
        "https://springbootbackend-production-4c75.up.railway.app/user/" +
          parseInt(id),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      // Handle the response from the server here
      const data = await response.json();

      if (data.status) {
        // Assuming a successful response contains a "success" property
        console.log("successful");
        // Navigate to the home page or handle the navigation as needed
        Navigate("/");
      } else {
        alert("failed");
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "id") setId(e.target.value);
    else setPassword(e.target.value);
  };

  return (
    <div className="modal-overlay">
      <div className="operation operation--credentials card hidden">
        <h2>Change Credentials</h2>
        <form className="form form--transfer" onSubmit={handleSubmit}>
          <input
            type="num"
            className="form__input form__input--to"
            onChange={handleInputChange}
            name="id"
            value={id}
          />
          <input
            type="text"
            className="form__input form__input--amount"
            onChange={handleInputChange}
            name="password"
            value={password}
          />
          <button className="form__btn form__btn--transfer">&rarr;</button>
          <label className="form__label">user ID</label>
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
