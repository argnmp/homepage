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

let categoryData = fs.readFileSync(
    path.resolve(__dirname, '../metadata/category.json')
)
categoryData = JSON.parse(categoryData);

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
    try{
        let category = req.params.lowerdirectory;
        let page = req.query.page | 1;
        let targetCategory;
        if(typeof(categoryData[`${category}`])==='object'){
            targetCategory = Object.keys(categoryData[`${category}`]).map(item=>{
                if(categoryData[`${category}`][item]){
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


        let currentPageData = await Post.find({category: { $in: [...targetCategory] }}).sort({uploadDate: -1})
            .skip(hidePost)
            .limit(maxPost);

        //using redux to send data from server to client
        //push page data into redux state
        const store = createStore(rootReducer);
        let preloadedState = store.getState();
        preloadedState.page.currentPage = 'list';
        preloadedState.page.currentPageData = currentPageData;
        preloadedState.page.currentPageMetadata = {currentCategory: category, totalPost,startPage, endPage, totalPage, currentPage, currentUri: `/${req.params.lowerdirectory}`};
        preloadedState.category.categoryData = categoryData;
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

    }catch{
        let err = new Error('Internal Server Error');
        err.status = 500;
        throw err;
    }

}));
router.get('/:upperdirectory/:lowerdirectory', wrapAsync(async (req,res)=>{
    try{
        let category = req.params.lowerdirectory;
        let page = req.query.page | 1;
        const totalPost = await Post.countDocuments({category: `${category}`});
        let {
            startPage,
            endPage,
            hidePost,
            maxPost,
            totalPage,
            currentPage
        } = paging(page, totalPost);

        let currentPageData = await Post.find({category: `${category}`}).sort({uploadDate: -1})
            .skip(hidePost)
            .limit(maxPost);

        //using redux to send data from server to client
        //push page data into redux state
        const store = createStore(rootReducer);
        let preloadedState = store.getState();
        preloadedState.page.currentPage = 'list';
        preloadedState.page.currentPageData = currentPageData;
        preloadedState.page.currentPageMetadata = {currentCategory: category, totalPost, startPage, endPage, totalPage, currentPage, currentUri: `/${req.params.upperdirectory}/${req.params.lowerdirectory}`};
        preloadedState.category.categoryData = categoryData;
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
        
    }catch{
        let err = new Error('Internal Server Error');
        err.status = 500;
        throw err;
    }
}));


module.exports = router;
