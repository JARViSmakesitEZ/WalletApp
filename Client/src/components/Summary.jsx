import React from "react";
import { useRecoilValue } from "recoil";
import { movementState } from "../recoil/user/movementState";

function Summary(props) {
  let inAmount = 0;
  let outAmount = 0;
  let interest = 0;
  const data = useRecoilValue(movementState);
  for (let i = 0; i < data.length; i++) {
    if (data[i].type === "deposit") {
      inAmount += data[i].amount;
    } else if (data[i].type === "withdrawal") {
      outAmount += data[i].amount;
    }
  }
  return (
    <div class="summary">
      <p class="summary__label">In</p>
      <p class="summary__value summary__value--in">{inAmount}</p>
      <p class="summary__label">Out</p>
      <p class="summary__value summary__value--out">{outAmount}</p>
      {/* <button class="btn--sort">&downarrow; SORT</button> */}
    </div>
  );
}

export default Summary;
