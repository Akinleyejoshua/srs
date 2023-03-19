const User = require("../models/User");

async function getUserData(req, res) {
    const { id } = req.body;
    try {
        const userExist = await User.findOne({ _id: id }).lean();
        if (userExist) {
            userExist.password = "";
            return res.status(200).send(userExist);
        } else {
            return res.status(200).send("not-found");
        }
    } catch (err) {
        return res.status(201).json({
            success: false,
            msg: "invalid-id"
        })
    }


}

async function updateUserData(req, res) {
    const body = req.body;
    body.password = await bcrypt.hash(body.password, 10);;

    const updateUser = await User.updateOne(body);

    if (updateUser.modifiedCount > 0) return res.status(201).json({
        success: true,
        msg: "updated"
    })

    return res.status(201).json({
        success: false,
        msg: "error"
    })
}

async function getAllUser(req, res) {
    const users = await User.find().lean();

    if (users) {
        users.map(item => item.password = "");
        return res.status(200).send(users);
    } else {
        return res.status(200).send("not-found");
    }
}

module.exports = {
    getUserData,
    updateUserData,
    getAllUser
}