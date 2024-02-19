import React from "react";
import axios from "axios";
import OperationStatus from "./OperationStatus";

function ShowLoanRequest(props, userData, propSec) {
  const [response, setResponse] = React.useState("");

  async function processResponse(e) {
    const sender = props.username;
    const requestID = props.index;
    const amount = props.amount;
    const response = e;
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
          }),
        }
      );

      const json = await res2.json();
      const movements = json.transactions.transactions;

      propSec.setLoanRequests(updatedLoanRequests);
      propSec.setMovements(movements);
      propSec.setBalance(balance);
      propSec.setOperationState(
        <OperationStatus
          setOperationState={props.setOperationState}
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
        {props.username} requested ₹ {props.amount}.
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

// function showLoanRequest(props) {
//   async function processResponse(e, index) {
//     console.log(index);
//     // try {
//     //   const loanRequestStatus = await axios.post(
//     //     "http://localhost:5001/api/endpoint/processloan",
//     //     // { username, amount, sender }
//     //   );
//     //   setAmount(0);
//     //   setUsername("");
//     // } catch (error) {
//     //   // Handle any errors that occurred during the request
//     //   console.error("Error:", error);
//     // }
//   }
//   return (
//     <div className="loan-request">
//       <p>
//         {props.username} has requested ₹ {props.amount} from you .
//       </p>
//       <button
//         className="approve-btn"
//         onClick={(e, index) => processResponse(e, index)}
//       >
//         Approve
//       </button>
//       <button
//         className="reject-btn"
//         onClick={(e, index) => processResponse(e, index)}
//       >
//         Reject
//       </button>
//     </div>
//   );
// }

function LoanRequest(props) {
  const userData = props.userData;
  const requests = props.loanRequests;

  return (
    <div className="loan-requests-container">
      <p className={requests.length > 0 ? "hide" : "no_requests"}>
        No Loan Requests .
      </p>
      {requests ? (
        <div>
          {requests.map((data, index) =>
            ShowLoanRequest({ ...data, index: index }, userData, props)
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default LoanRequest;
