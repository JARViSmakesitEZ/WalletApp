import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { balanceState } from "../recoil/user/balanceState";

const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

function Balance(props) {
  const [balance, setBalance] = useRecoilState(balanceState);
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
      <p class="balance__value">₹ {balance}</p>
    </div>
  );
}

export default Balance;
