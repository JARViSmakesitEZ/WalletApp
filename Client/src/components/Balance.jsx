import React from "react";

const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

function Balance(props) {
  const [balance, setBalance] = React.useState(props.balanceValue);
  return (
    <div class="balance homePage__animation">
      <div class="date-label">
        <p class="balance__label">Current Balance</p>
        <p class="balance__date">
          As of{" "}
          <span class="date">
            {day}/{month}/{year}
          </span>
        </p>
      </div>
      <p class="balance__value">₹ {props.balanceValue}</p>
    </div>
  );
}

export default Balance;
