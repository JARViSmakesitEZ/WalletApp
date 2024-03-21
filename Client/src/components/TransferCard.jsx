import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TransferCard(props) {
  const Navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    reciever: "",
    amount: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const transferStatus = await axios.post(
        "http://localhost:5001/api/endpoint/transfer",
        { ...formData, sender: props.userData.username, token: document.cookie }
      );

      // Handle the response from the server here
      const transferData = transferStatus.data;

      if (transferData.success) {
        // Assuming a successful response contains a "success" property
        console.log("Transfer successful");
        // Navigate to the home page or handle the navigation as needed
        Navigate("/home");
      } else {
        console.log("Transfer failed");
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
    <div className="operation operation--transfer card">
      <h2>Transfer money</h2>
      <form className="form form--transfer" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form__input form__input--to"
          onChange={handleInputChange}
          name="reciever"
          value={formData.reciever}
        />
        <input
          type="number"
          className="form__input form__input--amount"
          onChange={handleInputChange}
          name="amount"
          value={formData.amount}
        />
        <button
          className="form__btn form__btn--transfer"
          onClick={() => {
            props.onTransaction(props.currBalance - formData.amount);
            // props.addMovement();
          }}
        >
          &rarr;
        </button>
        <label className="form__label">Transfer to</label>
        <label className="form__label">Amount</label>
      </form>
    </div>
  );
}

export default TransferCard;
