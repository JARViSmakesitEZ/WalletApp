import React, { useState } from "react";
import axios from "axios";
import OperationStatus from "./OperationStatus";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { balanceState } from "../recoil/user/balanceState";
import { movementState } from "../recoil/user/movementState";
import { loanRequestsState } from "../recoil/user/loanRequestsState";

function LoanRequest({ userData }) {
  const setBalance = useSetRecoilState(balanceState);
  const setMovements = useSetRecoilState(movementState);
  const [loanRequests, setLoanRequests] = useRecoilState(loanRequestsState);
  const [operationState, setOperationState] = useState("");
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

    async function processResponse(e) {
      const requestID = index;
      const amount = data.amount;
      const response = e;

      try {
        const res = await fetch(
          "https://springbootbackend-production-4c75.up.railway.app/loan/process",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              senderId: userData.id,
              amount,
              receiverId: data.senderId,
              requestID,
              response,
              // token: document.cookie,
            }),
          }
        );
        const status = await res.json();
        console.log("this is status");
        console.log(status);

        const updatedLoanRequests = status.reqs;
        const balance = status.balance;
        try {
          const response = await fetch(
            `https://springbootbackend-production-4c75.up.railway.app/transaction/${userData.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const json = await response.json();
          console.log(json);
          // const movements = json.movements;
          // console.log("this is movements");
          // console.log(json);

          setLoanRequests(updatedLoanRequests);
          setMovements(json);
          setBalance(balance);
          setOperationState(
            <OperationStatus
              setOperationState={setOperationState}
              success={status.success}
              msg={status.msg}
            />
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log(data); // or handle the data as needed
        } catch (error) {
          console.error("Error fetching transaction:", error);
        }
      } catch (error) {
        // Handle any errors that occurred during the request
        console.error("Error:", error);
      }
    }

    return (
      <div className="movements__row">
        <p className="loanreq--msg">
          user ID:{data.senderId} has requested ₹ {data.amount}.
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

  return (
    <div className="loan-requests-container">
      <p className={loanRequests.length === 0 ? "no_requests" : "hide"}>
        No Loan Requests.
      </p>
      {loanRequests.map((data, index) => (
        <ShowLoanRequest
          data={data}
          index={data.id}
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
