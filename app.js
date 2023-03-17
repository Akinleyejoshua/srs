const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./connection')()
const indexRouter = require('./routes/index');
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const transactionRouter = require("./routes/transaction");

const app = express();

// view engine setup
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/transaction", transactionRouter);

module.exports = app;
