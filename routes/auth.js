var express = require('express');
var router = express.Router();
const { signin, signup, changePassword } = require("../controllers/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/change-password", changePassword);

module.exports = router;
