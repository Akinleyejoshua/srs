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

    const userExist = await User.findOne({ email: email, }).lean();

    if (userExist) {
        const passwordMatch = await bcrypt.compare(password, userExist.password);

        if (passwordMatch) {
            const token = await tokenGenerator({ id: userExist._id }, process.env.TOKEN_SECRET_KEY, "24h");


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
            msg: "not-found",
        })
    }

    return res.send("")

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

    const userExist = await User.findOne({ email: email, number: number }).lean();

    if (userExist) {

        return res.status(200).json({
            success: false,
            msg: "already-exist"
        });

    } else {

        const newUser = new User(body);

        if (await newUser.save()) {
            return res.status(200).json({
                success: true,
                msg: "created"
            });

        } else {
            return res.status(200).json({
                success: false,
                msg: "error"
            });

        }
    }
}

async function changePassword(req, res) {
    const { id, password } = req.body;
    const hash = await bcrypt.hash(password, 10)

    try {
        const newPassword = await User.findOneAndUpdate({ _id: id, password: hash }).lean();
        if (newPassword) {
            return res.status(201).json({
                success: true,
                msg: "updated"
            })
        } else {
            return res.status(201).json({
                success: false,
                msg: "not-found"
            })
        }
    } catch (err) {
        return res.status(201).json({
            success: false,
            msg: "invalid-id"
        })
    }

}

module.exports = {
    signin,
    signup,
    changePassword,
}