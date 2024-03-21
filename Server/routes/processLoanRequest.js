const express = require("express");
const router = express.Router();
const { User, Movement } = require("../db");

const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

router.post("/", async (req, res) => {
  const data = req.body;
  console.log("data:");
  console.log(data);

  const updatedRequests = await processLoanRequest(data);
  res.send({ ...updatedRequests, success: true });
});

async function processLoanRequest(data) {
  const senderUsername = data.username;
  const receiverUsername = data.sender;
  const amount = parseFloat(data.amount);
  const response = data.response;
  const requestID = data.requestID;

  try {
    const sender = await User.findOne({ username: senderUsername });
    const receiver = await User.findOne({ username: receiverUsername });
    let transactions;

    if (response === "approve") {
      await processDeposit({ username: receiverUsername, amount: amount });
      await processWithdraw({ username: senderUsername, amount: amount });
      transactions = await updateTransactionHistory(data);
    }

    const loanRequests = sender.loanRequests;
    const updatedLoanRequests = [
      ...loanRequests.slice(0, requestID),
      ...loanRequests.slice(requestID + 1),
    ];
    // const balance = await sender.balance;
    // const movements = await sender.transactions;

    await User.findOneAndUpdate(
      { username: senderUsername },
      { loanRequests: updatedLoanRequests },
      { new: true }
    );

    const userData = await User.findOne({ username: senderUsername }).populate(
      "transactions"
    );
    const trans = userData.transactions;
    const reqs = userData.loanRequests;
    const balance = userData.balance;

    return {
      reqs,
      balance,
      movements: trans,
      status: true,
      transactions: transactions,
      msg: "successful",
    };
  } catch (error) {
    console.error("Error:", error);
    // res.status(500).json({ message: "Server error" });
  }
}

async function processWithdraw(data) {
  try {
    const user = await User.findOne({ username: data.username });
    const updatedBalance = parseFloat(user.balance) - parseFloat(data.amount);

    // Update the user's balance in the database
    await User.findOneAndUpdate(
      { username: data.username },
      { balance: updatedBalance },
      { new: true }
    );
    // res.json({ message: "Balance updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    // res.status(500).json({ message: "Server error" });
  }
}

async function processDeposit(data) {
  try {
    const user = await User.findOne({ username: data.username });

    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    const updatedBalance = parseFloat(user.balance) + parseFloat(data.amount);
    // console.log(user.username + " updatedBalance:" + updatedBalance);

    // Update the user's balance in the database
    await User.findOneAndUpdate(
      { username: data.username },
      { balance: updatedBalance },
      { new: true }
    );

    // res.json({ message: "Balance updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    // res.status(500).json({ message: "Server error" });
  }
}

async function updateTransactionHistory(data) {
  // console.log("transaction data:");
  // console.log(data);
  const senderTransaction = await new Movement({
    type: "withdrawal",
    date: `${day}/${month}/${year}`,
    amount: data.amount,
    senderID: data.username,
    recieverID: data.sender,
  });
  const recieverTransaction = await new Movement({
    type: "deposit",
    date: `${day}/${month}/${year}`,
    amount: data.amount,
    senderID: data.username,
    recieverID: data.sender,
  });
  try {
    const senderUser = await User.findOne({ username: data.username }).populate(
      "transactions"
    );
    const recieverUser = await User.findOne({
      username: data.sender,
    }).populate("transactions");

    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    const senderTransactions = senderUser.transactions;
    const recieverTransactions = recieverUser.transactions;
    senderTransactions.push(senderTransaction);
    recieverTransactions.push(recieverTransaction);
    await senderTransaction.save();
    await recieverTransaction.save();

    // Update the user's balance in the database
    await User.findOneAndUpdate(
      { username: data.username },
      { transactions: senderTransactions },
      { new: true }
    );
    await User.findOneAndUpdate(
      { username: data.sender },
      { transactions: recieverTransactions },
      { new: true }
    );
    return senderTransactions;
    // res.json({ message: "Balance updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    // res.status(500).json({ message: "Server error" });
  }
}

module.exports = router;
