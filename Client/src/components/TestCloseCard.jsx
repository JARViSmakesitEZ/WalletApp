import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CloseCard(props) {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

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
      const response = await axios.delete(
        "https://springboot-backend-4.onrender.com/user",
        {
          data: { ...formData },
        }
      );

      if (response.status === 200) {
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.log(error);
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
            name="password"
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
