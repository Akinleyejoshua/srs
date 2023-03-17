const Transaction = require("../models/Transaction");

async function getTransactions(req, res){
    const {id} = req.body;
    const transactions = await Transaction.find({_id: id}).lean();
    if (transactions){
        return res.status(200).send(transactions);
    }
}

async function saveTransaction(req, res) {
    const body = req.body;

    const newTransaction = new Transaction(body);

    if (await newTransaction.save()) {
        return res.status(201).json({
            success: true,
            msg: "created"
        })
    }
}

module.exports = {
    getTransactions,
    saveTransaction,
}