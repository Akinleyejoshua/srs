var express = require('express');
var router = express.Router();
const {getTransactions, saveTransaction} = require("../controllers/transaction");
const authToken = require("../middlewares/auth");

router.post("/", authToken, getTransactions);
router.post("/update", authToken, saveTransaction);

module.exports = router;
