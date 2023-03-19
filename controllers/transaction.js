const Transaction = require("../models/Transaction");

async function getTransactions(req, res) {
    const { id } = req.body;
    const transactions = await Transaction.find({ id: id }).lean();
    if (transactions.length > 0) {
        return res.status(200).send(transactions);
    } else {
        return res.status(200).send("not-found");
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
    } else {
        return res.status(201).json({
            success: false,
            msg: "error"
        })
    }
}

async function deleteTransaction(req, res) {
    const { id } = req.body;
    const deleteTransaction = await Transaction.deleteOne({ _id: id }).lean();

    if (deleteTransaction.deletedCount > 0) {
        return res.json({
            message: "deleted",
            success: true,
        })
    } else {
        return res.status(201).json({
            success: false,
            msg: "error"
        })
    }
}

async function getAllTransactions(req, res){
    const transactions = await Transaction.find().lean();
    if (transactions.length > 0) {
        return res.status(200).send(transactions);
    } else {
        return res.status(200).send("not-found");
    }
}

module.exports = {
    getTransactions,
    saveTransaction,
    deleteTransaction,
    getAllTransactions
}