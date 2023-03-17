var express = require('express');
var router = express.Router();
const {getUserData, updateUserData} = require("../controllers/user");
const authToken = require("../middlewares/auth");

router.get("/", authToken, getUserData);
router.post("/update", authToken, updateUserData);

module.exports = router;
