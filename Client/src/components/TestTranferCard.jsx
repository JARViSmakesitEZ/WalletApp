import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OperationStatus from "./OperationStatus";

function TestTransferCard(props) {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    reciever: "",
    amount: 0,
  });
  async function handleSubmit(e) {
    e.preventDefault();
    props.setCardState("cle");
    console.log("we good");
    const response = await fetch(
      "http://localhost:5001/api/endpoint/transfer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, sender: props.userData.username }),
      }
    );
    const responseJson = await response.json();
    console.log(responseJson);
    if (responseJson.status) {
      console.log(11111);
      console.log(props.movements);
      props.setBalance(responseJson.balance);
      props.setMovements([
        ...props.movements,
        {
          recieverID: responseJson.reciever,
          amount: responseJson.amount,
          type: "withdrawal",
          date: responseJson.date,
          id: responseJson.id,
        },
      ]);
    }
    props.setOperationState(
      <OperationStatus
        setOperationState={props.setOperationState}
        success={responseJson.status}
        msg={responseJson.msg}
      />
    );
  }
  return (
    <div className="modal-overlay">
      <div className="operation operation--transfer card hidden">
        <h2>Transfer money</h2>
        <form className="form form--transfer" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form__input form__input--to"
            name="reciever"
            onChange={(e) =>
              setFormData({ ...formData, reciever: e.target.value })
            }
          />
          <input
            type="number"
            className="form__input form__input--amount"
            name="amount"
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
          <button className="form__btn form__btn--transfer">&rarr;</button>
          <label className="form__label">Transfer to</label>
          <label className="form__label">Amount</label>
        </form>
      </div>
      <button className="closeButton" onClick={() => props.setCardState("")}>
        close
      </button>
    </div>
  );
}

export default TestTransferCard;
