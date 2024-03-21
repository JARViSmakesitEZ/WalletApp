const express = require("express");
const cors = require("cors");
const app = express();
const port = 5001;
const jwt = require("jsonwebtoken");
const secretKey = "jarvis787";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Custom middleware function
const auth = (req, res, next) => {
  let token = req.body.token;
  token = req.body.token.split(" ")[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      console.log(decoded);
      next();
    }
  });
};

// Import route handlers
const loginRoute = require("./routes/login");
const transferRoute = require("./routes/testTransfer");
const signupRoute = require("./routes/signup");
const loanRoute = require("./routes/loan");
const processLoanRoute = require("./routes/processLoanRequest");
const changeCredentialsRoute = require("./routes/changeCredentials");
const transactionsRoute = require("./routes/transactions");
const mongoose = require("mongoose");

// Use the auth middleware on all routes except signup and login
app.use((req, res, next) => {
  if (
    req.path === "/api/endpoint/login" ||
    req.path === "/api/endpoint/signup"
  ) {
    next();
  } else {
    auth(req, res, next);
  }
});

// Define route handlers
app.use("/api/endpoint/login", loginRoute);
app.use("/api/endpoint/transfer", transferRoute);
app.use("/api/endpoint/signup", signupRoute);
app.use("/api/endpoint/loan", loanRoute);
app.use("/api/endpoint/processloan", processLoanRoute);
app.use("/api/endpoint/changecredentials", changeCredentialsRoute);
app.use("/api/endpoint/gettransactions", transactionsRoute);

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
