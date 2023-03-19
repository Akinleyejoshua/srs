var express = require('express');
var router = express.Router();
const {getTransactions, saveTransaction, deleteTransaction, getAllTransactions} = require("../controllers/transaction");
const authToken = require("../middlewares/auth");

router.get("/", authToken, getTransactions);
router.get("/all", authToken, getAllTransactions);
router.post("/add", authToken, saveTransaction);
router.delete("/delete", authToken, deleteTransaction);

module.exports = router;