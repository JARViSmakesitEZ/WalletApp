import React from "react";

function showMovements(data) {
  return (
    <div className="movements__row" key={data.id}>
      {data.type === "deposit" ? (
        <div className="movements__type movements__type--deposit">
          <p>deposit</p>
        </div>
      ) : (
        <div className="movements__type movements__type--withdrawal">
          <p>withdrawal</p>
        </div>
      )}
      <div className="participant_bg">
        {data.type === "deposit" ? (
          <div className="movements__participant">{data.senderID}</div>
        ) : (
          <div className="movements__participant">{data.recieverID}</div>
        )}
      </div>
      {/* <div className="movements__date">{data.senderID}</div> */}
      <div className="movements__date">
        <p>{data.date}</p>
      </div>
      <div className="movements__value">
        <p>₹ {data.amount}</p>
      </div>
    </div>
  );
}

function Movement(props) {
  const movements = props.movements;
  return (
    <div className="movements homePage__animation">
      <p className={movements.length > 0 ? "hide" : "no_transactions"}>
        No Transactions .
      </p>
      {movements.map((data) => showMovements(data))}
    </div>
  );
}

export default Movement;
