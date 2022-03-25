const http = require('http');
const https = require('https');

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
const db = connect();

//routes
const indexRouter = require('./routes/index.js');
const profileRouter = require('./routes/profile.js');
const categoryRouter = require('./routes/category.js')
const postRouter = require('./routes/post.js');
const apiRouter = require('./routes/api.js');
const uploadRouter = require('./routes/upload.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));

//authentication
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: `${process.env.COOKIE_SECRET}`,
    cookie: { maxAge: 60 * 60 * 1000 },
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

/* //http redirect to https
app.get("*", (req, res, next) => {
    if(req.secure){
        // --- https
        next();
    }else{
        // -- http
        let to = "https://" + req.headers.host + req.url;
        return res.redirect("https://" + req.headers.host + req.url);
    }
})
*/

app.use('/dist',express.static(path.join(__dirname , '../../dist')));
//__dirname으로 해주어야함. 그렇지 않으면 node로 실행할때 다른 위치에서 실행할 경우 경로가 이상하게 됨.

app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/category', categoryRouter);
app.use('/post', postRouter);
app.use('/api',apiRouter);
app.use('/upload',uploadRouter);

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

http.createServer(app).listen(app.get('port'), ()=>{
    console.log('server started at port',app.get('port'));
})
/* //for https connection used for gcp
let privateKey = fs.readFileSync("/etc/letsencrypt/live/kimtahen.com/privkey.pem");
let certificate = fs.readFileSync("/etc/letsencrypt/live/kimtahen.com/cert.pem");
let ca = fs.readFileSync("/etc/letsencrypt/live/kimtahen.com/chain.pem");
const credentials = {key:privateKey, cert:certificate, ca: ca};
https.createServer(credentials, app).listen(443,()=>{
    console.log('https server started at port',433);
})
*/
