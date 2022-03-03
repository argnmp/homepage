const express = require('express');
import fs from 'fs';
import path from 'path';
import {renderToString} from 'react-dom/server';
import React from 'react';

//redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../src/reducers/index';

import App from '../../src/App.js';
const router = express.Router();

//mongodb
import Post from '../models/postModel';

const html = fs.readFileSync(
    path.resolve(__dirname, '../../../dist/index.html'),
    'utf8'
)

const categoryData = fs.readFileSync(
    path.resolve(__dirname, '../metadata/category.json')
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


router.get('/:upperdirectory/:lowerdirectory', wrapAsync(async (req,res)=>{
    let category = req.params.lowerdirectory;
    let page = req.query.page;
    const totalPost = await Post.countDocuments({});
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
    preloadedState.page.currentPage = 'post';
    preloadedState.page.currentPageData = currentPageData;
    preloadedState.page.currentPageMetadata = {startPage, endPage, totalPage, currentPage}
    preloadedState.category.categoryData = JSON.parse(categoryData);

    let renderString = renderToString(<Provider store={store}><App/></Provider>);

    const result = html
    .replace('__REDUX_STATE_FROM_SERVER__', JSON.stringify(preloadedState))
    .replace(
        '<div id="root"></div>',
        `<div id="root">${renderString}</div>`
    )
    res.send(result);
}));


module.exports = router;
