const express = require('express');
const path = require('path');
const logger = require('morgan');const cookieParser = require("cookie-parser");
const session = require("express-session");
const fs = require('fs');
require("dotenv").config();

//routers
const indexRouter = require('./routes/index.js');
const profileRouter = require('./routes/profile.js');

const app = express();
const html = fs.readFileSync(
    path.resolve(__dirname, '../dist/index.html'),
    'utf8'
)

const sessionMiddleware = session({
    resave: false,
    saveUninitialized: false,
    secret: `${process.env.COOKIE_SECRET}`,
    cookie: {
        httpOnly: true,
        secure: false,
    }
})

app.set('port', process.env.PORT || 8000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);

app.use('/',indexRouter);
app.use('/profile', profileRouter);

// 위의 routing 이외의 것에 대해 동작함.
app.use((req,res,next)=>{
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
})

app.use((err, req, res, next)=>{
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
})

const server = app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기중입니다.');
})

module.exports = app;
