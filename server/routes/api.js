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

import {renderToString} from 'react-dom/server';
import React from 'react';

//redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../src/modules/index';

import App from '../../src/App.js';
const router = express.Router();

const html = fs.readFileSync(
    path.resolve(__dirname, '../../../dist/index.html'),
    'utf8'
)
const categoryData = fs.readFileSync(
    path.resolve(__dirname, '../metadata/category.json')
)

//multer
import upload from '../controllers/multer.js';


//mongodb
import User from '../models/userModel.js';
import Image from '../models/imageModel.js';
import Comment from '../models/commentModel.js';
import Post from '../models/postModel.js';
import { query } from 'express';

//비동기 함수에 대한 에러처리
function wrapAsync(fn) {
    return function(req, res, next) {
      // Make sure to `.catch()` any errors and pass them along to the `next()`
      // middleware in the chain, in this case the error handler.
      fn(req, res, next).catch(next);
    };
  }

//comment
router.post('/comment', wrapAsync(async (req, res)=>{
    if(!req.user){
        let err = new Error('Unauthorized');
        err.status = 401;
        throw err;
    }
    else {
        try{
            if(req.body.depth > 5) {
                let err = new Error('Comment depth exceed');
                err.status = 500;
                throw err;
            }
            if(req.body.depth == 1){
                await Comment.createComment({
                    depth: req.body.depth,
                    postId: req.body.postId,
                    authorId: req.user._id,
                    parentCommentId: null,
                    data: req.body.data
                });                  
            }
            else {
                await Comment.createComment({
                    depth: req.body.depth,
                    postId: req.body.postId,
                    authorId: req.user._id,
                    parentCommentId: req.body.parentCommentId,
                    data: req.body.data
                });                  

            }
            res.status(201).end();
        }
        catch (e) {
            console.log(e);
            if (!e) {
                let err = new Error('Internal Server Error');
                err.status = 500;
                throw err;
            }
            else {
                throw e;
            }
        }
    }


}));
router.post('/commentedit', wrapAsync(async (req, res)=>{
    if(!req.user){
        let err = new Error('Unauthorized');
        err.status = 401;
        throw err;
    }
    else {
        try{
            const query = await Comment.findOne({_id: req.body.comment});
            if(req.user._id.toString()!==query.author.toString()){
                let err = new Error('Unauthorized');
                err.status = 401;
                throw err;
            }
            await Comment.updateOne({_id: req.body.comment},{
                data: req.body.data,
                editDate: Date.now()
            })
            res.status(201).end();
        }
        catch (e) {
            console.log(e);
            if (!e) {
                let err = new Error('Internal Server Error');
                err.status = 500;
                throw err;
            }
            else {
                throw e;
            }
        }
    }


}));
router.delete('/comment/:id', wrapAsync(async (req, res)=>{
    if(!req.user){
        let err = new Error('Unauthorized');
        err.status = 401;
        throw err;
    }
    else {
        try{
            const query = await Comment.findOne({_id: req.params.id});
            if(req.user._id.toString()!==query.author.toString()){
                let err = new Error('Unauthorized');
                err.status = 401;
                throw err;
            }
            await Comment.updateOne({_id: req.params.id},{
                isDeleted: true,
            })
            res.status(201).end();
            
        }
        catch (e) {
            if (!e) {
                let err = new Error('Internal Server Error');
                err.status = 500;
                throw err;
            }
            else {
                throw e;
            }
        }
    }


}));

//image upload
router.get('/image/:uri', wrapAsync(async (req, res)=>{
    try{
        const query = await Image.findOne({uri: req.params.uri});
        if(query){
            res.contentType(query.img.contentType);
            res.end(query.img.data);
        }else {
            let err = new Error('not found');
            err.status = 404;
            throw err;
        }
    }catch (e){
        if(!e){
            let err = new Error('Internal Server Error');
            err.status = 500;
            throw err;
        }
        else {
            throw e;
        }
    }

}));
router.post('/image',upload.array('image'), wrapAsync(async (req,res)=>{
    if(!req.user || req.user.level > 0){
        let err = new Error('Unauthorized');
        err.status = 401;
        throw err;
    }
    else {
        try{
            let payloads = [];
            for(let i = 0; i < req.files.length; i++){
                let payload = new Image({
                    uri: `${Date.now()}_${req.files[i].originalname.replace(" ","")}`,
                    originalname: req.files[i].originalname,
                    isTemp: true,
                    img: {
                        data: req.files[i].buffer,
                        contentType: req.files[i].mimetype,  
                    },
                });
                payloads.push(payload);
            }
            await Promise.all(payloads.map(payload=>payload.save()));
            res.status(201).json(payloads.map(payload=>({url: `/api/image/${payload.uri}`})));
        }
        catch {
            let err = new Error('internal serverError');
            err.status = 500;
            throw err
        }
    }

}));
router.delete('/image/:uri', wrapAsync(async (req, res)=>{
    if(!req.user || req.user.level > 0){
        let err = new Error('Unauthorized');
        err.status = 401;
        throw err;
    }
    else {
        try{
            const query = await Image.deleteOne({uri: req.params.uri});
            if(query.deletedCount >= 0){
                res.status(200).end();
            }else {
                let err = new Error('not found');
                err.status = 404;
                throw err;
            }
        }catch (e){
            if(!e){
                let err = new Error('Internal Server Error');
                err.status = 500;
                throw err;
            }
            else {
                throw e;
            }
        }

    }

}));

//login
router.get('/login', wrapAsync(async (req,res)=>{
    if(req.user){
        res.status(200).redirect('/');
    }
    try{
        //using redux to send data from server to client
        //push page data into redux state
        const store = createStore(rootReducer);
        let preloadedState = store.getState();
        preloadedState.page.currentPage = 'login';
        preloadedState.page.currentPageData = '';
        preloadedState.category.categoryData = JSON.parse(categoryData);

        if(!req.user){
            preloadedState.user.isLogined = false;
            preloadedState.user.name = "";
        }
        else{
            preloadedState.user.isLogined = true;
            preloadedState.user.isLogined = true;
            preloadedState.user.name = req.user.name;
            preloadedState.user.email = req.user.email;
            preloadedState.user._id = req.user._id;
            preloadedState.user.level = req.user.level;

        }


        let renderString = renderToString(<Provider store={store}><App/></Provider>);

        const result = html
            .replace('__REDUX_STATE_FROM_SERVER__', JSON.stringify(preloadedState))
            .replace(
                '<div id="root"></div>',
                `<div id="root">${renderString}</div>`
            )
        res.send(result);

    }catch(e){
        console.log(e);
        let err = new Error('Internal Server Error');
        err.status = 500;
        throw err;

    }

}));

router.post('/login', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/api/login',
    failureFlash: true,
}))
router.get('/logout',(req,res)=>{
    req.logout();
    req.session.save(()=>{
        res.redirect('/');
    })
})

router.get('/register', (req,res)=>{
    if(req.user){
        res.status(200).redirect('/');
    }
    else {
        try {
            //using redux to send data from server to client
            //push page data into redux state
            const store = createStore(rootReducer);
            let preloadedState = store.getState();
            preloadedState.page.currentPage = 'register';
            preloadedState.page.currentPageData = '';
            preloadedState.category.categoryData = JSON.parse(categoryData);

            let renderString = renderToString(<Provider store={store}><App /></Provider>);

            const result = html
                .replace('__REDUX_STATE_FROM_SERVER__', JSON.stringify(preloadedState))
                .replace(
                    '<div id="root"></div>',
                    `<div id="root">${renderString}</div>`
                )
            res.send(result);

        } catch (e) {
            console.log(e);
            let err = new Error('Internal Server Error');
            err.status = 500;
            throw err;

        }
    }
});
router.post('/register',wrapAsync(async (req,res)=>{
    if(req.user){
        res.status(200).redirect('/');
    }
    else {
        try{
            const email = req.body.email;
            const name = req.body.name;
            const password = req.body.password;
            
            const query = await User.findOne({$or:[{email: email}, {name: name}]});
            if(!query){
                let result = await User.localRegister({ email, name, password });
                res.status(200).json({
                    isSuccess: true
                });
            }
            else {
                if(email===query.email){
                    res.status(200).json({
                        isSuccess: false,
                        msg: 'Email exists'
                    })
                }
                else if(name===query.name){
                    res.status(200).json({
                        isSuccess: false,
                        msg: 'Name exists'
                    })
                }
            }

        }catch (e){
            if(!e){
                let err = new Error('Internal Server Error');
                err.status = 500;
                throw err;
            }
            else {
                throw e;
            }
        }
    }

}));


module.exports = router;
