import React from "react";
import CloseCard from "./CloseCard";
import TransferCard from "./TransferCard";
import LoanCard from "./LoanCard";

function Card(props) {
  return (
    <div className="cards homePage__animation">
      <TransferCard
        userData={props.userData}
        onTransaction={props.onTransaction}
        currBalance={props.currBalance}
        onMovement={props.updateMovements}
      />
      <LoanCard
        userData={props.userData}
        onMovement={props.updateMovements}
        onRequestResponse={props.updateLoanRequests}
        currBalance={props.currBalance}
      />
      {/* <CloseCard userData={props.userData} /> */}
    </div>
  );
}

export default Card;
