const express = require("express");
const router = express.Router();
const { User, Movement } = require("../db");

router.post("/", async (req, res) => {
  try {
    const username = req.body.username;
    const transactions = await User.findOne({ username: username }).populate(
      "transactions"
    );
    console.log(transactions);
    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ msg: "Server error.", status: false });
  }
});

module.exports = router;
