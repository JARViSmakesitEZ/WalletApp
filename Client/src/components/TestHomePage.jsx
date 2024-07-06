import { useState, useEffect } from "react";
import Balance from "./Balance";
import Movement from "./Movement";
import Summary from "./Summary";
import Card from "./Card";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
// import Functionalities from "./Functionalities";
import ShowTransactions from "./ShowTransactions";
import LoanRequest from "./LoanRequest";
import Modal from "./Modal";
import Functionalities from "./TestFuncs";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { balanceState } from "../recoil/user/balanceState";
import { movementState } from "../recoil/user/movementState";
import { loanRequestsState } from "../recoil/user/loanRequestsState";

function HomePage() {
  const location = useLocation();
  console.log(location);
  const [userData, setUserData] = useState(location.state);
  const [balance, setBalance] = useRecoilState(balanceState);
  const [movements, setMovements] = useRecoilState(movementState);
  const [loanRequests, setLoanRequests] = useRecoilState(loanRequestsState);
  console.log("userdata:");
  console.log(userData);

  useEffect(() => {
    if (userData.movements != null) setMovements(userData.movements);
    setBalance(userData.balance);
    if (userData.loanRequests != null) setLoanRequests(userData.loanRequests);
  }, []);

  return (
    <div>
      <Navbar text={`Welcome back ${userData.username} .`} />
      <Balance />
      <ShowTransactions />
      <Functionalities userData={userData} />
      <Movement />
      <Summary />
      <LoanRequest userData={userData} />
    </div>
  );
}

export default HomePage;
