var express = require('express');
var router = express.Router();
const {getTransactions, saveTransaction, deleteTransaction} = require("../controllers/transaction");
const authToken = require("../middlewares/auth");

router.get("/", authToken, getTransactions);
router.post("/add", authToken, saveTransaction);
router.delete("/delete", authToken, deleteTransaction);

module.exports = router;