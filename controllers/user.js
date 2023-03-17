const User = require("../models/User");

async function getUserData(req, res) {
    const { id } = req.body;
    const userExist = await User.findOne({ _id: id }).lean();
    if (userExist) {
        userExist.password = "";
        return res.status(200).send(userExist);
    } else {
        return res.status(200).send("user-not-found");
    }

}

async function updateUserData(req, res) {
    const body = req.body;
    body.password = await bcrypt.hash(body.password, 10);;

    const updateUser = await User.updateOne(body);

    if (updateUser) return res.status(201).json({
        success: true,
        msg: "updated"
    })
}
module.exports = {
    getUserData,
    updateUserData
}