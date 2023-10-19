const express = require("express");
const cors = require("cors");
const { User, Movement } = require("./db");
const port = 5001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.get();

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

app.post("/api/endpoint/login", async (req, res) => {
  try {
    const formData = req.body;
    const userData = formData.formData;

    // Make sure the 'validateUser' function populates the 'transactions' field.
    const user = await validateUser(userData);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error." });
  }
});

app.post("/api/endpoint/transfer", async (req, res) => {
  const data = req.body;
  const transactionAmount = parseFloat(data.amount);
  console.log(data);
  processDeposit({ reciever: data.reciever, amount: transactionAmount });
  processWithdraw({ sender: data.sender, amount: transactionAmount });
  updateTransactionHistory(data);
});

app.post("/api/endpoint/signup", async (req, res) => {
  const data = req.body.formData;
  const user = new User({ ...data, transactions: [] });
  user.save();
  // console.log(data);
});

async function validateUser(userData) {
  if (!userData.username || !userData.password) {
    throw new Error("Enter the credentials");
  }
  try {
    // Query the database for the user
    const user = await User.findOne({
      $and: [userData],
    }).populate("transactions");

    if (!user) {
      throw new Error("User not found.");
    }
    return user;
  } catch (error) {
    console.error("Error:", error.message);
    throw error; // Rethrow the error for higher-level error handling
  }
}

async function processDeposit(data) {
  try {
    const user = await User.findOne({ username: data.reciever });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedBalance = parseFloat(user.balance) + parseFloat(data.amount);
    console.log("updatedBalance:" + updatedBalance);

    // Update the user's balance in the database
    await User.findOneAndUpdate(
      { username: data.reciever },
      { balance: updatedBalance },
      { new: true }
    );

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
      return res.status(404).json({ message: "User not found" });
    }

    const updatedBalance = parseFloat(user.balance) - parseFloat(data.amount);
    console.log("updatedBalance:" + updatedBalance);

    // Update the user's balance in the database
    await User.findOneAndUpdate(
      { username: data.sender },
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
    // res.json({ message: "Balance updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    // res.status(500).json({ message: "Server error" });
  }
}
