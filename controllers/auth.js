require("dotenv").config();
const User = require("../models/User");
const tokenGenerator = require("../utils/jwt");
const bcrypt = require("bcrypt");

async function signin(req, res) {
    const { email, password } = req.body;

    if ([email, password].includes(undefined)) return res.status(200).json({
        success: false,
        msg: "empty-values"
    });

    const UserExist = await User.findOne({ email: email, }).lean();

    if (UserExist) {
        const passwordMatch = await bcrypt.compare(password, UserExist.password);

        if (passwordMatch) {
            const token = await tokenGenerator({ id: UserExist._id }, process.env.TOKEN_SECRET_KEY, "24h");

            return res.status(200).json({
                success: true,
                msg: "access-granted",
                accessToken: token
            });


        } else {
            return res.status(200).json({
                success: false,
                msg: "wrong-data",
            })
        }


    } else {
        return res.status(200).json({
            success: false,
            msg: "User-not-found",
        })
    }

    res.send("")

}


async function signup(req, res) {
    const { email, number, password } = req.body;
    const body = req.body;

    body.password = await bcrypt.hash(password, 10);;
    body.uniqueID = (Math.random() + 1).toString(36).substring(4).toLocaleUpperCase();

    if ([email, number, password].includes(undefined)) return res.status(200).json({
        success: false,
        msg: "empty-values"
    });

    const UserExist = await User.findOne({ email: email, number: number }).lean();

    if (UserExist) {

        return res.status(200).json({
            success: false,
            msg: "User-exist"
        });

    } else {

        const newUser = new User(body);

        if (await newUser.save()) {
            return res.status(200).json({
                success: true,
                msg: "User-created"
            });

        } else {
            return res.status(200).json({
                success: false,
                msg: "User-error"
            });

        }
    }
}

module.exports = {
    signin,
    signup
}