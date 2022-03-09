//express
const express = require('express');
import fs from 'fs';
import path from 'path';
const router = express.Router();

//markdown parser
import {marked} from 'marked';
marked.setOptions({
    headerPrefix: 'hid'
})

//react
import {renderToString} from 'react-dom/server';
import React from 'react';
import App from '../../src/App.js';

//redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../src/modules/index';

//mongodb
import Post from '../models/postModel.js';

//modules
import {imageStateChangeAndDelete, imageStateRestore} from '../modules/imgSanitizer';


const html = fs.readFileSync(
    path.resolve(__dirname, '../../../dist/index.html'),
    'utf8'
)

const categoryData = fs.readFileSync(
    path.resolve(__dirname, '../metadata/category.json')
)

//비동기 함수에 대한 에러처리 
function wrapAsync(fn) {
    return function(req, res, next) {
      // Make sure to `.catch()` any errors and pass them along to the `next()`
      // middleware in the chain, in this case the error handler.
      fn(req, res, next).catch(next);
    };
  }
router.post('/', wrapAsync(async(req,res)=>{
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

            imageStateChangeAndDelete(data);

            await payload.save();
            res.status(201).json({
                redirectUrl:`/post/${uri}` 
            });

        }catch(e){
            let err = new Error('internal serverError');
            err.status = 500;
            throw err
            
        }
    }
}));
router.get('/:uri', wrapAsync(async (req,res,next)=>{
    try {
        let currentPageData;
        let currentPageMetadata;
        const query = await Post.findOne({uri: req.params.uri});

        //if not found, query will be null;
        if(query){
            currentPageData = query.data;
            currentPageMetadata = {title: query.title, author: query.author, uploadDate: query.uploadDate};
        }
        else{
            let err = new Error('not found');
            err.status = 404;
            throw err;
        }

        //using redux to send data from server to client
        //push page data into redux state
        const store = createStore(rootReducer);
        let preloadedState = store.getState();
        preloadedState.page.currentPage = 'post';
        preloadedState.page.currentPageData = currentPageData;
        preloadedState.page.currentPageMetadata = currentPageMetadata;
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

    } catch (e){
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


module.exports = router;
