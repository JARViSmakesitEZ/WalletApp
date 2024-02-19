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

function HomePage() {
  const location = useLocation();
  const [userData, setUserData] = useState(location.state);
  const [balance, setBalance] = useState(userData.balance);
  const [movements, setMovements] = useState(userData.transactions);
  const [loanRequests, setLoanRequests] = useState(userData.loanRequests);
  function updateBalance(newBal) {
    setBalance(newBal);
  }
  function updateMovements(movements) {
    // setMovements([...movements, newMovement]);
    setMovements(movements);
  }

  // function updateLoanRequests()
  return (
    <div>
      <Navbar text={`Welcome back ${userData.username} .`} />
      <Balance balanceValue={balance} />
      <ShowTransactions />
      <Functionalities
        userData={userData}
        setMovements={setMovements}
        movements={movements}
        setBalance={setBalance}
      />
      {/* <Card /> */}
      <Movement movements={movements} setMovements={setMovements} />
      <Summary movements={movements} />

      <LoanRequest
        setLoanRequests={setLoanRequests}
        setBalance={setBalance}
        setMovements={setMovements}
        movements={movements}
        userData={userData}
        loanRequests={loanRequests}
        balance={balance}
      />
    </div>
  );
}

export default HomePage;
