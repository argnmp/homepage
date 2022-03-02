//express
const express = require('express');
import fs from 'fs';
const passport = require('passport');
import path from 'path';
const router = express.Router();



//mongodb
const mongoose = require('mongoose');
import Post from '../models/postModel.js';

//로그인 로그아웃 여부
const authInfo = (req)=>{
    if(req.user) return `${req.user.name} | <a href="/logout">로그아웃</a>`;
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
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}))

//upload
router.post('/post/:filename', async(req,res)=>{
    
});
router.post('/image/:filename',(req,res)=>{

});



module.exports = router;