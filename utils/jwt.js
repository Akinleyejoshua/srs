const jwt = require("jsonwebtoken");

module.exports = async function tokenGenerator(data, key, exp) {
    return jwt.sign(data, `${key}`, {
        expiresIn: exp,
    });
}