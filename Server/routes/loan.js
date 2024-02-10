const express = require("express");
const router = express.Router();
const { User, Movement } = require("../db");

router.post("/", async (req, res) => {
  const data = req.body;
  const status = await sendRequest(data);
  try {
    const user = await User.findOne({ username: data.username });
    if (!user) {
      res.status(500).json({ status: false, msg: "user not found" });
      return;
    }
  } catch (err) {
    res.status(500).json({ status: false, msg: "server error" });
    return;
  }

  if (status) {
    res.status(200).json({ status: true, msg: "successful" });
  } else {
    res.status(500).json({ status: false, msg: "server error" });
  }
});

async function sendRequest(data) {
  const amount = parseFloat(data.amount);
  const username = data.username;
  const sender = data.sender;
  try {
    const user = await User.findOne({ username: username });

    const loanRequests = user.loanRequests;
    const newRequest = { amount: amount, username: sender };
    const updatedLoanRequests = [...loanRequests, newRequest];
    // Assuming you want to update the loanRequests array for the same user
    await User.findOneAndUpdate(
      { username: username },
      { loanRequests: updatedLoanRequests },
      { new: true }
    );

    return true;
  } catch (error) {
    return false;
  }
}

module.exports = router;
