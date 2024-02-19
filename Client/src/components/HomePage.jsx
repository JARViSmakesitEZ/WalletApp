import React from "react";
import Balance from "./Balance";
import Movement from "./Movement";
import Summary from "./Summary";
import Card from "./Card";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Functionalities from "./Functionalities";
import ShowTransactions from "./ShowTransactions";
import LoanRequest from "./LoanRequest";
import Modal from "./Modal";

function HomePage() {
  const [isModalOpen, setModalOpen] = React.useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const location = useLocation();
  const userData = location.state;
  const [balance, setBalance] = React.useState(userData.balance);
  const [LoanRequests, setLoanRequests] = React.useState(userData.loanRequests);
  function updateBalance(newBal) {
    setBalance(newBal);
  }
  const [movements, setMovements] = React.useState(userData.transactions);
  function updateMovements(movements) {
    // setMovements([...movements, newMovement]);
    setMovements(movements);
  }
  function updateLoanRequests(requests) {
    setLoanRequests(requests);
  }

  // function updateLoanRequests()
  return (
    <div>
      <Navbar text={`Welcome back ${userData.username} .`} />
      <Balance balanceValue={balance} />
      <ShowTransactions />
      <Functionalities userData={userData} />
      {/* <Card /> */}
      <Movement movements={userData.transactions} />
      <Summary movements={userData.transactions} />
      {/* <Card
        userData={userData}
        onTransaction={updateBalance}
        currBalance={balance}
        onRequestResponse={updateLoanRequests}
        onMovement={updateMovements}
      /> */}
      <LoanRequest
        loanRequests={LoanRequests}
        accountOwner={userData.username}
        onTransaction={updateBalance}
        currBalance={balance}
        onRequestResponse={updateLoanRequests}
        onMovement={updateMovements}
      />
      <div>
        <h1>Your App Content</h1>
        <button onClick={openModal}>Open Modal</button>

        {isModalOpen && <Modal onClose={closeModal} />}
      </div>
    </div>
  );
}

export default HomePage;
