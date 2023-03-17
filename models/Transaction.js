const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    telephone: Number,
    weight: Number,
    amount: Number,
    transactionType: String,
    date: String,
    userId: String,
});

module.exports = mongoose.model("transactions", userSchema);