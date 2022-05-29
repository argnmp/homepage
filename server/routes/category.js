const express = require('express');
import fs from 'fs';
import path from 'path';
import {renderToString} from 'react-dom/server';
import React from 'react';

//redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../src/modules/index';

import App from '../../src/App.js';
const router = express.Router();

//mongodb
import Post from '../models/postModel';

const html = fs.readFileSync(
    path.resolve(__dirname, '../../../dist/index.html'),
    'utf8'
)

function wrapAsync(fn) {
    return function(req, res, next) {
        // Make sure to `.catch()` any errors and pass them along to the `next()`
        // middleware in the chain, in this case the error handler.
        fn(req, res, next).catch(next);
    };
}

//paigination
import paging from '../modules/paging';


router.get('/:lowerdirectory', wrapAsync(async (req,res)=>{
    const app = req.app;
    try{
        let category = req.params.lowerdirectory;
        let page = req.query.page || 1;
        let targetCategory;
        const categoryList = app.get('categoryList');
        if(typeof(categoryList[`${category}`])==='object'){
            targetCategory = Object.keys(categoryList[`${category}`]).map(item=>{
                if(categoryList[`${category}`][item]){
                    return item;
                }
            });
        }
        else {
            targetCategory = [category];
        }
        const totalPost = await Post.countDocuments({category: { $in: [...targetCategory] }});
        let {
            startPage,
            endPage,
            hidePost,
            maxPost,
            totalPage,
            currentPage
        } = paging(page, totalPost);

        let currentPageData = await Post.find({category: { $in: [...targetCategory] }},{data: 0, mdData: 0}).sort({uploadDate: -1})
            .skip(hidePost)
            .limit(maxPost)
            .populate({path: 'author', select: 'name'});

        //using redux to send data from server to client
        //push page data into redux state
        const store = createStore(rootReducer);
        let preloadedState = store.getState();
        preloadedState.page.currentPage = 'list';
        preloadedState.page.currentPageData = currentPageData;
        preloadedState.page.currentPageMetadata = {currentCategory: category, totalPost,startPage, endPage, totalPage, currentPage, currentUri: `/${req.params.lowerdirectory}`};
        preloadedState.category.categoryData = {
            categoryList: app.get('categoryList'),
            categoryCount: app.get('categoryCount'),
        };
        if(!req.user){
            preloadedState.user.isLogined = false;
            preloadedState.user.name = "";
        }
        else{
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
router.get('/:upperdirectory/:lowerdirectory', wrapAsync(async (req,res)=>{
    const app = req.app;
    try{
        let category = req.params.lowerdirectory;
        let page = req.query.page || 1;
        const totalPost = await Post.countDocuments({category: `${category}`});
        let {
            startPage,
            endPage,
            hidePost,
            maxPost,
            totalPage,
            currentPage
        } = paging(page, totalPost);

        let currentPageData = await Post.find({category: `${category}`},{data: 0, mdData: 0}).sort({uploadDate: -1})
            .skip(hidePost)
            .limit(maxPost)
            .populate({path: 'author', select: 'name'});

        //using redux to send data from server to client
        //push page data into redux state
        const store = createStore(rootReducer);
        let preloadedState = store.getState();
        preloadedState.page.currentPage = 'list';
        preloadedState.page.currentPageData = currentPageData;

        preloadedState.page.currentPageMetadata = {currentCategory: category, totalPost, startPage, endPage, totalPage, currentPage, currentUri: `/${req.params.upperdirectory}/${req.params.lowerdirectory}`};
        preloadedState.category.categoryData = {
            categoryList: app.get('categoryList'),
            categoryCount: app.get('categoryCount'),
        };
        if(!req.user){
            preloadedState.user.isLogined = false;
            preloadedState.user.name = "";
        }
        else{
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


module.exports = router;
