const express = require("express");
const router = express.Router();
const { User, Movement } = require("../db");

router.post("/", async (req, res) => {
  console.log("request recieved");
  console.log(req.body);
  const data = req.body;
  const transactionAmount = parseFloat(data.amount);
  const senderData = await getUserData(data.sender);
  const recieverData = await getUserData(data.reciever);
  console.log(senderData, recieverData);
  if (!senderData.status) {
    res.json(senderData);
  } else if (!recieverData.status) {
    res.json(recieverData);
  }
  // if (senderData.balance < transactionAmount) {
  //   res.status(500).json({ success: false, msg: "not enough balance" });
  //   return;
  // }
  const updateDBstatus = await addTransactionToDB({
    sender: data.sender,
    senderBalance: senderData.balance,
    reciever: data.reciever,
    recieverBalance: recieverData.balance,
    amount: transactionAmount,
  });

  console.log(updateDBstatus);

  if (updateDBstatus.status) {
    console.log("we good");
    res.status(200).json(updateDBstatus);
  } else {
    res.status(500).json(updateDBstatus);
  }
});

async function addTransactionToDB({
  sender,
  senderBalance,
  reciever,
  recieverBalance,
  amount,
}) {
  try {
    const updateSenderStatus = await User.findOneAndUpdate(
      { username: sender },
      { balance: senderBalance - amount }
    );

    if (!updateSenderStatus) {
      return {
        status: false,
        msg: "Error updating sender balance",
      };
    }

    const updateRecieverStatus = await User.findOneAndUpdate(
      { username: reciever },
      { balance: recieverBalance + amount }
    );

    if (!updateRecieverStatus) {
      // Roll back the sender's balance update in case of failure
      await User.findOneAndUpdate(
        { username: sender },
        { balance: senderBalance }
      );

      return { status: false, msg: "Error updating receiver balance" };
    }

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const newSenderMovement = new Movement({
      type: "withdrawal",
      date: `${day}/${month}/${year}`,
      amount: amount,
      senderID: sender,
      recieverID: reciever,
    });

    const senderMovementStatus = await newSenderMovement.save();
    const id = senderMovementStatus._id;

    const newRecieverMovement = new Movement({
      type: "deposit",
      date: `${day}/${month}/${year}`,
      amount: amount,
      senderID: sender,
      recieverID: reciever,
    });

    newRecieverMovement.save();

    const senderMovements = (
      await User.findOne({
        username: sender,
      }).populate("transactions")
    ).transactions;

    const recieverMovements = (
      await User.findOne({
        username: reciever,
      }).populate("transactions")
    ).transactions;

    senderMovements.push(newSenderMovement);
    recieverMovements.push(newRecieverMovement);

    const senderMovementUpdateStatus = await User.findOneAndUpdate(
      { username: sender },
      { transactions: senderMovements }
    );

    const receiverMovementUpdateStatus = await User.findOneAndUpdate(
      { username: reciever },
      { transactions: recieverMovements }
    );

    return {
      status: true,
      msg: "Transaction successful",
      reciever,
      balance: senderBalance - amount,
      amount,
      date: `${day}/${month}/${year}`,
      id,
    };
  } catch (error) {
    console.error("Error adding transaction to DB:", error.message);
    return { status: false, msg: "Internal server error" };
  }
}

async function getUserData(user) {
  try {
    const userData = await User.findOne({ username: user });

    if (!userData) {
      return { status: false, msg: "user not found" };
    } else {
      return { status: true, msg: "", balance: userData.balance };
    }
  } catch (error) {
    return { status: false, msg: "cannot connect to the database" };
  }
}

module.exports = router;
