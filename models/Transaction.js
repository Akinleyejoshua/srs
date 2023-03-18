const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    number: Number,
    weight: Number,
    amount: Number,
    transactionType: String,
    date: String,
    id: String,
});

module.exports = mongoose.model("transactions", userSchema);