const express = require("express");
const cors = require("cors");
const app = express();
const port = 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Import route handlers
const loginRoute = require("./routes/login");
const transferRoute = require("./routes/testTransfer");
const signupRoute = require("./routes/signup");
const loanRoute = require("./routes/loan");
const processLoanRoute = require("./routes/processLoanRequest");
const changeCredentialsRoute = require("./routes/changeCredentials");
const transactionsRoute = require("./routes/transactions");
const mongoose = require("mongoose");

// const DB =
//   "mongodb+srv://JARViS787:Jee2021%40@cluster0.wjsrv46.mongodb.net/?retryWrites=true&w=majority";

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   })
//   .then(() => {
//     console.log("connection successful!");
//   })
//   .catch((error) => console.log("no connection..."));

app.use("/api/endpoint/login", loginRoute);
app.use("/api/endpoint/transfer", transferRoute);
app.use("/api/endpoint/signup", signupRoute);
app.use("/api/endpoint/loan", loanRoute);
app.use("/api/endpoint/processloan", processLoanRoute);
app.use("/api/endpoint/changecredentials", changeCredentialsRoute);
app.use("/api/endpoint/gettransactions", transactionsRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
