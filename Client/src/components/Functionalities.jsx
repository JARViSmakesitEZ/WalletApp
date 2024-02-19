import React from "react";
// import TransferCard from "./TransferCard";
// import LoanCard from "./LoanCard";
// import CloseCard from "./CloseCard";
// import Card from "./Card";

function Functionalities() {
  const [btnState, setBtnState] = React.useState("");

  function highlightBtn(e) {
    setBtnState(e.target.className);
  }
  function removeHighlight() {
    setBtnState("");
  }
  function displayCard(e) {
    const functionality = e.target.className;
  }
  return (
    <div className="functionalities">
      {/* <button className="movements_btn">Show Movements</button> */}
      <button
        className={
          btnState !== "transfer_btn"
            ? "transfer_btn"
            : "transfer_btn highlight"
        }
        onMouseEnter={highlightBtn}
        onMouseLeave={removeHighlight}
        onClick={displayCard}
      >
        Transfer Money
      </button>
      <button
        className={btnState !== "loan_btn" ? "loan_btn" : "loan_btn highlight"}
        onMouseEnter={highlightBtn}
        onMouseLeave={removeHighlight}
        onClick={displayCard}
      >
        Ask For Loan
      </button>
      <button
        className={
          btnState !== "credentials_btn"
            ? "credentials_btn"
            : "credentials_btn highlight"
        }
        onMouseEnter={highlightBtn}
        onMouseLeave={removeHighlight}
        onClick={displayCard}
      >
        Change Credentials
      </button>
      <button
        className={
          btnState !== "close_btn" ? "close_btn" : "close_btn highlight"
        }
        onMouseEnter={highlightBtn}
        onMouseLeave={removeHighlight}
        onClick={displayCard}
      >
        Close Account
      </button>
      {/* <Card /> */}
    </div>
  );
}

export default Functionalities;
