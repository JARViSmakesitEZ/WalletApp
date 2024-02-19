const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const formData = req.body;
    const userData = formData.formData;
    console.log(userData);

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

module.exports = router;
