import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoanCard(props) {
  const Navigate = useNavigate();
  const [amount, setAmount] = React.useState(0);
  const [username, setUsername] = React.useState("");
  const sender = props.userData.username;

  function updateAmount(e) {
    setAmount(e.target.value);
  }
  function updateUsername(e) {
    setUsername(e.target.value);
  }
  async function sendLoanRequest(e) {
    e.preventDefault();

    try {
      const loanRequestStatus = await axios.post(
        "http://localhost:5001/api/endpoint/loan",
        { username, amount, sender }
      );
      setAmount(0);
      setUsername("");
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error:", error);
    }
  }
  return (
    <div className="operation operation--loan card">
      <h2>Request loan</h2>
      <form className="form form--loan" onSubmit={sendLoanRequest}>
        <input
          type="text"
          className="form__input form__input--to"
          name="username"
          onChange={updateUsername}
        />
        <input
          type="number"
          className="form__input form__input--amount"
          name="amount"
          onChange={updateAmount}
        />

        <button className="form__btn form__btn--transfer">&rarr;</button>
        <label className="form__label">Request to</label>
        <label className="form__label">Amount</label>
      </form>
    </div>
  );
}

export default LoanCard;
