require("dotenv").config();

const mongoose = require("mongoose");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.set("strictQuery", false);

const mongoURI = "mongodb+srv://srs:srs@cluster0.7zgysaf.mongodb.net/?retryWrites=true&w=majority"

const connect = async () => {
    await mongoose.connect(mongoURI, options).then(res => {
        if (res) return console.log("Database Connected")
        console.log("MongoDB Database Connection Failed")
    }).catch(err => {
        console.log("MongoDB Database Connection Failed: " + err)
    })

}

module.exports = connect;
