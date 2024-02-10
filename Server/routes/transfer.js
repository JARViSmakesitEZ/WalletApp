const express = require("express");
const router = express.Router();
const { User, Movement } = require("../db");

router.post("/", async (req, res) => {
  console.log("request recieved");
  console.log(req.body);
  const data = req.body;
  const transactionAmount = parseFloat(data.amount);
  processDeposit({ reciever: data.reciever, amount: transactionAmount }, res);
  processWithdraw({ sender: data.sender, amount: transactionAmount }, res);
  updateTransactionHistory(data, res);
});

async function processDeposit(data) {
  try {
    const user = await User.findOne({ username: data.reciever });

    if (!user) {
      data.res.status(404).json({ msg: "User not found", success: false });
    }

    const updatedBalance = parseFloat(user.balance) + parseFloat(data.amount);
    console.log("updatedBalance:" + updatedBalance);

    // Update the user's balance in the database
    await User.findOneAndUpdate(
      { username: data.reciever },
      { balance: updatedBalance },
      { new: true }
    );
    data.res.status(200).json({ success: true });

    // res.json({ message: "Balance updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    // res.status(500).json({ message: "Server error" });
  }
}

async function processWithdraw(data) {
  try {
    const user = await User.findOne({ username: data.sender });

    if (!user) {
      data.res.status(404).json({ message: "User not found", success: false });
    }

    const updatedBalance = parseFloat(user.balance) - parseFloat(data.amount);
    console.log("updatedBalance:" + updatedBalance);

    // Update the user's balance in the database
    await User.findOneAndUpdate(
      { username: data.sender },
      { balance: updatedBalance },
      { new: true }
    );
    data.res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    // res.status(500).json({ message: "Server error" });
  }
}

async function updateTransactionHistory(data) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const senderTransaction = new Movement({
    type: "withdrawal",
    date: `${day}/${month}/${year}`,
    amount: data.amount,
    senderID: data.sender,
    recieverID: data.reciever,
  });
  const recieverTransaction = new Movement({
    type: "deposit",
    date: `${day}/${month}/${year}`,
    amount: data.amount,
    senderID: data.sender,
    recieverID: data.reciever,
  });
  try {
    const senderUser = await User.findOne({ username: data.sender }).populate(
      "transactions"
    );
    const recieverUser = await User.findOne({
      username: data.reciever,
    }).populate("transactions");

    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    const senderTransactions = senderUser.transactions;
    const recieverTransactions = recieverUser.transactions;
    // console.log(senderTransactions);
    // console.log(recieverTransactions);
    console.log(senderTransactions);
    senderTransactions.push(senderTransaction);
    recieverTransactions.push(recieverTransaction);
    senderTransaction.save();
    recieverTransaction.save();

    // Update the user's balance in the database
    await User.findOneAndUpdate(
      { username: data.sender },
      { transactions: senderTransactions },
      { new: true }
    );
    await User.findOneAndUpdate(
      { username: data.reciever },
      { transactions: recieverTransactions },
      { new: true }
    );
    data.res.status(200).json({ success: true });
    // res.json({ message: "Balance updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    // res.status(500).json({ message: "Server error" });
  }
}

module.exports = router;
