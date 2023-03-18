var nodemailer = require('nodemailer');
require("dotenv").config();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${process.env.EMAIL_USER}`,
        pass: `${process.env.EMAIL_PASS}`
    }
});

module.exports = mail = async (from, to, subject, template) => {

    const mailOptions = {
        from: `${from}`, // sender address
        to: `${to}`, // list of receivers
        subject: `${subject}`, // Subject line
        html: `${template}`// plain text body
    };

    return transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });

}