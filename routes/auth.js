var express = require('express');
var router = express.Router();
const { signin, signup } = require("../controllers/auth");

router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
