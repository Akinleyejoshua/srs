const jwtAuth = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.TOKEN_SECRET_KEY

module.exports = async function authToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) {
        return res.status(403).send("access-denied");
    } else {
        jwtAuth.verify(token, secret, (err, user) => {
            try {
                if (err) return res.status(200).send("token-expired");
                next();

            } catch (err) {
                console.log(err);
            }
        })
    }
}