import React from "react";
import TestTransferCard from "./TestTranferCard";
import TestLoanCard from "./TestLoanCard";
import TestCloseCard from "./TestCloseCard";
import TestCredentialsCard from "./TestCredentialsCard";
import OperationStatus from "./OperationStatus";
import { useNavigate } from "react-router-dom";

function Functionalities({
  userData,
  onTransaction,
  movements,
  setMovements,
  setBalance,
}) {
  const [cardState, setCardState] = React.useState("");
  const [operationState, setOperationState] = React.useState("");
  const navigate = useNavigate();

  return (
    <div className="functionalities">
      <button
        className="transfer_btn"
        onClick={() =>
          setCardState(
            <TestTransferCard
              userData={userData}
              setCardState={setCardState}
              setOperationState={setOperationState}
              onTransaction={onTransaction}
              setMovements={setMovements}
              movements={movements}
              setBalance={setBalance}
            />
          )
        }
      >
        Transfer Money
      </button>
      <button
        className="loan_btn"
        onClick={() =>
          setCardState(
            <TestLoanCard
              userData={userData}
              setCardState={setCardState}
              setOperationState={setOperationState}
              onTransaction={onTransaction}
            />
          )
        }
      >
        Ask For Loan
      </button>
      <button
        className="credentials_btn"
        onClick={() => {
          setCardState(
            <TestCredentialsCard
              setCardState={setCardState}
              setOperationState={setOperationState}
              username={userData.username}
            />
          );
        }}
      >
        Change Credentials
      </button>
      <button
        className="close_btn"
        onClick={() =>
          setCardState(
            <TestCloseCard
              userData={userData}
              setCardState={setCardState}
              setOperationState={setOperationState}
            />
          )
        }
      >
        Close Account
      </button>
      <button
        className="logout_btn"
        onClick={() => {
          navigate("/");
        }}
      >
        Log out
      </button>
      <div>{cardState}</div>
      <div>{operationState}</div>
      {/* <TestTransferCard /> */}
      {/* <TestLoanCard userData={userData} /> */}
      {/* <TestCredentialsCard /> */}
      {/* <TestCloseCard /> */}
    </div>
  );
}

export default Functionalities;
