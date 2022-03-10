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
import Image from '../models/imageModel.js';

//비동기 함수에 대한 에러처리
function wrapAsync(fn) {
    return function(req, res, next) {
      // Make sure to `.catch()` any errors and pass them along to the `next()`
      // middleware in the chain, in this case the error handler.
      fn(req, res, next).catch(next);
    };
  }

//image upload

router.get('/imagetest', (req,res)=>{
    res.sendFile(path.join(__dirname, './image.html'));
})
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
    if(!req.user){
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
    if(!req.user){
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
router.get('/',(req,res)=>{
    let page = getPage('Passport','This is Passport Example Page',authInfo(req));
    console.log(req.user);
    res.send(page);
});
router.get('/login', wrapAsync(async (req,res)=>{
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
            preloadedState.user.name = req.user.name;
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



module.exports = router;
