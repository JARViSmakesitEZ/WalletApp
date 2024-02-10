const { User } = require("../db");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log("just got hit at change credentials endpoint");
  try {
    // Make sure the 'validateUser' function populates the 'transactions' field.
    const data = await validateUser(req.body);

    if (data.status) {
      res.status(200).json(data);
    } else {
      res.status(404).json(data);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ msg: "Server error.", status: false });
  }
});

async function validateUser(userData) {
  const username = userData.username;
  if (!userData.username || !userData.password) {
    return { status: false, msg: "Enter the credentials" };
  }
  try {
    // Query the database for the user
    const user = await User.findOne({
      $and: [{ username: userData.newUsername, password: userData.password }],
    });

    if (user) {
      return { status: false, msg: "user already exists" };
    }
    const status = await User.findOneAndUpdate(
      { username: userData.username },
      { username: userData.newusername, password: userData.password }
    );
    return { status: true, msg: "successful" };
  } catch (error) {
    // console.error("Error:", error.message);
    return { status: false, msg: "server error" };
    throw error; // Rethrow the error for higher-level error handling
  }
}

module.exports = router;
