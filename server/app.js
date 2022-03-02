const express = require('express');
const path = require('path');
const logger = require('morgan');const cookieParser = require("cookie-parser");
const session = require("express-session");
const fileStore = require('session-file-store')(session);
const fs = require('fs');
const flash = require('connect-flash');
require("dotenv").config();

//mongodb;
const connect = require('./db/index.js');
connect();

//routes
const indexRouter = require('./routes/index.js');
const profileRouter = require('./routes/profile.js');
const categoryRouter = require('./routes/category.js')
const postRouter = require('./routes/post.js');
const apiRouter = require('./routes/api.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));

//authentication
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: `${process.env.COOKIE_SECRET}`,
    //store: new fileStore(),
}));


let passport = require('passport');
require('./passport/index.js').config(passport);
app.use(passport.initialize());
app.use(passport.session());

app.set('port', process.env.PORT || 8000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger('dev'));
app.use(flash());



app.use('/dist',express.static(path.join(__dirname , '../../dist')));
//__dirname으로 해주어야함. 그렇지 않으면 node로 실행할때 다른 위치에서 실행할 경우 경로가 이상하게 됨.

app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/category', categoryRouter);
app.use('/post', postRouter);
app.use('/api',apiRouter)

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
