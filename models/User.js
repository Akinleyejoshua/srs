const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    number: Number,
    address: String,
    state: String,
    localGovernment: String,
    city: String,
    accountType: String,
    bankName: String,
    accountNumber: Number,
    earnings: Number,
    points: Number,
    pickup: Number,
    onBoard: Number,
    withdrawn: Number,
    balance: Number,
    dateRegistered: String,
    password: String,
    uniqueID: String,
});

module.exports = mongoose.model("users", userSchema);