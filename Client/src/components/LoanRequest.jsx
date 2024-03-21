import React, { useState } from "react";
import axios from "axios";
import OperationStatus from "./OperationStatus";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { balanceState } from "../recoil/user/balanceState";
import { movementState } from "../recoil/user/movementState";
import { loanRequestsState } from "../recoil/user/loanRequestsState";
function ShowLoanRequest({
  data,
  index,
  userData,
  loanRequests,
  setLoanRequests,
  setBalance,
  setMovements,
  setOperationState,
}) {
  const [response, setResponse] = React.useState("");
  console.log(1345);

  async function processResponse(e) {
    const sender = data.username;
    const requestID = index;
    const amount = data.amount;
    const response = e;
    console.log(document.cookie);

    try {
      const res = await fetch(
        "http://localhost:5001/api/endpoint/processloan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userData.username,
            amount,
            sender,
            requestID,
            response,
            token: document.cookie,
          }),
        }
      );
      const status = await res.json();
      console.log("status:");
      console.log(status);

      const updatedLoanRequests = status.reqs;
      const balance = status.balance;
      const res2 = await fetch(
        "http://localhost:5001/api/endpoint/gettransactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userData.username,
            token: document.cookie,
          }),
        }
      );

      const json = await res2.json();
      const movements = json.transactions.transactions;
      console.log("json:");
      console.log(json);

      setLoanRequests(updatedLoanRequests);
      setMovements(movements);
      setBalance(balance);
      setOperationState(
        <OperationStatus
          setOperationState={setOperationState}
          success={status.success}
          msg={status.msg}
        />
      );
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error:", error);
    }
  }

  return (
    <div className="movements__row">
      <p className="loanreq--msg">
        {data.username} requested ₹ {data.amount}.
      </p>
      <button
        className="approve-btn"
        name="approve"
        onClick={async () => {
          await processResponse("approve");
        }}
      >
        Approve
      </button>
      <button
        className="reject-btn"
        name="reject"
        onClick={async () => {
          await processResponse("reject");
        }}
      >
        Reject
      </button>
    </div>
  );
}

function LoanRequest({ userData }) {
  const setBalance = useSetRecoilState(balanceState);
  const setMovements = useSetRecoilState(movementState);
  const [loanRequests, setLoanRequests] = useRecoilState(loanRequestsState);
  const [operationState, setOperationState] = useState("");

  return (
    <div className="loan-requests-container">
      <p className={loanRequests.length > 0 ? "hide" : "no_requests"}>
        No Loan Requests.
      </p>
      {loanRequests.map((data, index) => (
        <ShowLoanRequest
          data={data}
          index={index}
          userData={userData}
          loanRequests={loanRequests}
          setLoanRequests={setLoanRequests}
          setBalance={setBalance}
          setMovements={setMovements}
          setOperationState={setOperationState}
        />
      ))}
    </div>
  );
}

export default LoanRequest;
