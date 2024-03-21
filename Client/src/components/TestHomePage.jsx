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
  const [userData, setUserData] = useState(location.state);
  const [balance, setBalance] = useRecoilState(balanceState);
  const [movements, setMovements] = useRecoilState(movementState);
  const [loanRequests, setLoanRequests] = useRecoilState(loanRequestsState);
  console.log("userdata:");
  console.log(userData);
  useEffect(() => {
    setMovements(userData.transactions);
    setBalance(userData.balance);
    setLoanRequests(userData.loanRequests);
  }, []);

  return (
    <div>
      <Navbar text={`Welcome back ${userData.username} .`} />
      <Balance />
      <ShowTransactions />
      <Functionalities userData={userData} />
<<<<<<< HEAD
      <Movement />
      <Summary />
      <LoanRequest userData={userData} />
=======
      {/* <Card /> */}
      <Movement />
      <Summary />

      <LoanRequest
        setLoanRequests={setLoanRequests}
        userData={userData}
        loanRequests={loanRequests}
      />
>>>>>>> 5a73cfcab540388769088a50f5b450490776065a
    </div>
  );
}

export default HomePage;
