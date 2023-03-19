var express = require('express');
var router = express.Router();
const {getUserData, updateUserData, getAllUser} = require("../controllers/user");
const authToken = require("../middlewares/auth");

router.get("/", authToken, getUserData);
router.get("/all", authToken, getAllUser);
router.post("/update", authToken, updateUserData);

module.exports = router;
