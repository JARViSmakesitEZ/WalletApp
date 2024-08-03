import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OperationStatus from "./OperationStatus";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { balanceState } from "../recoil/user/balanceState";
import { movementState } from "../recoil/user/movementState";

function TestTransferCard(props) {
  console.log(props);
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    receiverID: "",
    amount: 0,
  });
  const setBalance = useSetRecoilState(balanceState);
  const [movements, setMovements] = useRecoilState(movementState);
  async function handleSubmit(e) {
    e.preventDefault();
    props.setCardState("cle"); // Assuming "cle" is a state setter function
    if (formData.receiverID === props.userData.id) {
      props.setOperationState(
        <OperationStatus
          setOperationState={props.setOperationState}
          success={false}
          msg="Not Allowed."
        />
      );
      return;
    }

    try {
      const response = await axios.post(
        "https://springboot-backend-4.onrender.com/transaction",
        {
          ...formData,
          senderID: props.userData.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("these are the response");
      console.log(response);

      // Check if the response indicates success
      if (response.data.status) {
        // Update UI state based on successful response
        setBalance(response.data.user.balance);
        setMovements(response.data.user.movements);
      }

      // Update operation state based on response
      props.setOperationState(
        <OperationStatus
          setOperationState={props.setOperationState}
          success={response.data.status}
          msg={response.data.message}
        />
      );
    } catch (error) {
      // Log error for debugging
      console.log("Axios error:", error);
      // Handle error states or display error message as needed
    }
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
              setFormData({ ...formData, receiverID: e.target.value })
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
