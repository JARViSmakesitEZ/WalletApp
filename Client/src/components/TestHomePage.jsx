import { useState } from "react";
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

function HomePage() {
  const location = useLocation();
  const [userData, setUserData] = useState(location.state);
  const [balance, setBalance] = useRecoilState(balanceState);
  setBalance(userData.balance);
  const [movements, setMovements] = useRecoilState(movementState);
  setMovements(userData.transactions);
  const [loanRequests, setLoanRequests] = useState(userData.loanRequests);

  return (
    <div>
      <Navbar text={`Welcome back ${userData.username} .`} />
      <Balance />
      <ShowTransactions />
      <Functionalities userData={userData} />
      {/* <Card /> */}
      <Movement />
      <Summary />

      <LoanRequest
        setLoanRequests={setLoanRequests}
        userData={userData}
        loanRequests={loanRequests}
      />
    </div>
  );
}

export default HomePage;
