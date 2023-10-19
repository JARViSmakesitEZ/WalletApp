const express = require("express");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/bankDB")
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
});

const User = mongoose.model("User", bankSchema);
const Movement = mongoose.model("Movement", transactionSchema);

module.exports = {
  User,
  Movement,
};
