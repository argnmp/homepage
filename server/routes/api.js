//markdown parser
import {marked} from 'marked';
marked.setOptions({
    headerPrefix: 'hid'
})

//express
const express = require('express');
import fs from 'fs';
const passport = require('passport');
import path from 'path';
const router = express.Router();



//mongodb
const mongoose = require('mongoose');
import Post from '../models/postModel.js';

//비동기 함수에 대한 에러처리 
function wrapAsync(fn) {
    return function(req, res, next) {
      // Make sure to `.catch()` any errors and pass them along to the `next()`
      // middleware in the chain, in this case the error handler.
      fn(req, res, next).catch(next);
    };
  }
//upload
router.get('/post', (req,res)=>{
    res.sendFile(path.join(__dirname, './upload.html'));
})
router.post('/post', wrapAsync(async(req,res)=>{
    if(!req.user){
        let err = new Error('Unauthorized');
        err.status = 401;
        throw err;
    }
    else{
        try{
            let title = req.body.title;
            let uri = req.body.title;
            uri = uri.replace(/ /gi,"-");
            const sameTitleNum = await Post.countDocuments({title: title});
            if(sameTitleNum!==0) uri += `-${sameTitleNum}`;
            let author = req.user.name;
            let data = marked.parse(req.body.data);
            let category = req.body.category;

            let payload = new Post({
                uri,
                title,
                author,
                category,
                data,
                uploadDate: new Date()
            })  
            await payload.save();
            res.status(201).redirect(`/post/${uri}`);

        }catch(e){
            let err = new Error('internal serverError');
            err.status = 500;
            throw err
            
        }
    }
}));
router.post('/image/:filename',(req,res)=>{

});


// login example ---start
//로그인 로그아웃 여부
const authInfo = (req)=>{
    if(req.user) return `${req.user.name} | <a href="/api/logout">로그아웃</a>`;
    return `<a href="/api/login">login</a>`;
}

//페이지 템플릿
const getPage = (title, content, auth) =>{
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Passport Example</title>
    </head>
    <body>
    ${auth}
        <h1>${title}</h1>
        <p>${content}</p>
    </body>
    </html>
    `;
}
//login
router.get('/',(req,res)=>{
    let page = getPage('Passport','This is Passport Example Page',authInfo(req));
    console.log(req.user);
    res.send(page);
});
router.get('/login',(req,res)=>{
    let page =  getPage('로그인',`
    <form action="/api/login" method="post">
        <input type="text" name="id" placeholder="id"><br>
        <input type="password" name="pw" placeholder="****"><br>
        <div style="display : flex;justify-content:space-between;width: 153px;">
            <input type="submit" value="로그인" style="display:inline-block;">
            <a href="/join" style="background : #E5E5E5;padding : 2px; border: 0.5px solid black;cursor:pointer;border-radius:3px;font-size:13px;color:black;text-decoration:none;">회원가입</a>
        </div>
    </form>
    `,`<a href="/api/login">뒤로가기</a>`);
    res.send(page);
});
router.post('/login', passport.authenticate('local',{
    successRedirect: '/api',
    failureRedirect: '/api/login',
    failureFlash: true,
}))
router.get('/logout',(req,res)=>{
    req.logout();
    req.session.save(()=>{
        res.redirect('/');
    })
})
//login-example ----fin



module.exports = router;
