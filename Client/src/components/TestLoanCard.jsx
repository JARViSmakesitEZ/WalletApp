import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoanRequestStatus from "./LoanRequestStatus";

function LoanCard(props) {
  const Navigate = useNavigate();
  const [amount, setAmount] = React.useState(0);
  const [userId, setUserId] = React.useState(-1);
  const [requestStatus, setRequestStatus] = React.useState("");
  const senderId = props.userData.id;

  function updateAmount(e) {
    setAmount(e.target.value);
  }
  function updateUserId(e) {
    setUserId(e.target.value);
  }
  async function sendLoanRequest(e) {
    e.preventDefault();

    if (isNaN(userId) || isNaN(senderId) || isNaN(amount)) {
      setRequestStatus(
        <LoanRequestStatus
          setRequestStatus={setRequestStatus}
          success={false}
          msg="Invalid details. userId, senderId, and amount must be numbers."
        />
      );

      return;
    }

    if (senderId === userId) {
      setRequestStatus(
        <LoanRequestStatus
          setRequestStatus={setRequestStatus}
          success={false}
          msg="Not Allowed."
        />
      );
      return;
    }
    try {
      const response = await fetch(
        "https://springboot-backend-4.onrender.com/user/loan/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId,
            amount: parseInt(amount),
            userId,
          }),
        }
      );

      const responseJson = await response.json();
      console.log(responseJson);
      setRequestStatus(
        <LoanRequestStatus
          setRequestStatus={setRequestStatus}
          success={responseJson.status}
          msg={responseJson.msg}
        />
      );
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error:", error);
    }
  }
  return (
    <div className="modal-overlay">
      <div className="operation operation--loan card hidden">
        <h2>Request loan</h2>
        <form className="form form--loan" onSubmit={sendLoanRequest}>
          <input
            type="text"
            className="form__input form__input--to"
            name="username"
            onChange={updateUserId}
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
      <button className="closeButton" onClick={() => props.setCardState("")}>
        close
      </button>
      {requestStatus}
    </div>
  );
}

export default LoanCard;
