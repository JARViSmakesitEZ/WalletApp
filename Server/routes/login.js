const express = require("express");
const router = express.Router();
const { User, Movement } = require("../db");
const jwt = require("jsonwebtoken");
const secretKey = "jarvis787";

router.post("/", async (req, res) => {
  console.log("Hi i just got hit");
  try {
    const userData = req.body;

    // Make sure the 'validateUser' function populates the 'transactions' field.
    const data = await validateUser(userData);
    // Generate JWT token
    const token = jwt.sign(userData, secretKey, { expiresIn: 30 }); // Expires in 30 seconds
    // Token expires
    console.log(token);

    if (data.status) {
      res.status(200).json({ user: data.user, status: true, token: token });
    } else {
      res.status(404).json({ msg: "User not found.", status: false });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ msg: "Server error.", status: false });
  }
});

async function validateUser(userData) {
  if (!userData.username || !userData.password) {
    return { status: false, msg: "Enter the credentials" };
    throw new Error("Enter the credentials");
  }
  try {
    // Query the database for the user
    const user = await User.findOne({
      $and: [userData],
    }).populate("transactions");

    if (!user) {
      return { status: false, msg: "User not found" };
      // throw new Error("User not found.");
    }
    return { status: true, user: user };
  } catch (error) {
    // console.error("Error:", error.message);
    return { status: false, msg: "server error" };
    throw error; // Rethrow the error for higher-level error handling
  }
}

module.exports = router;
