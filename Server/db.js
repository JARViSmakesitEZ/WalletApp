const express = require("express");
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://gouravghosh2021:Ghoshalcapone@cluster0.nldlzts.mongodb.net/"
  )
  .then(() => {
    console.log("connected to the database.");
  })
  .catch(() => {
    console.log("failed to connect to the database.");
  });
const app = express();

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  date: {
    type: String,
  },
  amount: {
    type: Number,
  },
  senderID: {
    type: String,
  },
  recieverID: {
    type: String,
  },
});

const bankSchema = new mongoose.Schema({
  username: {
    type: String,
    // required: [true, 'why no name bro?give name'],
  },
  balance: {
    type: Number,
  },
  password: {
    type: Number,
  },
  email: {
    type: String,
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movement",
    },
  ],
  loanRequests: [
    {
      username: { type: String },
      amount: { type: Number },
    },
  ],
});

const User = mongoose.model("User", bankSchema);
const Movement = mongoose.model("Movement", transactionSchema);

module.exports = {
  User,
  Movement,
};
