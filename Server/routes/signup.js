const express = require("express");
const router = express.Router();
const { User, Movement } = require("../db");
const jwt = require("jsonwebtoken");
const secretKey = "jarvis787";

router.post("/", async (req, res) => {
  console.log("request recieved");
  const data = req.body.formData;
  const user = await new User({ ...data, transactions: [] });
  user.save();
  res.status(200).json({ status: true, msg: "signup successful" });
});

module.exports = router;
