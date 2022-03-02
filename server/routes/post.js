//express
const express = require('express');
import fs from 'fs';
import path from 'path';
const router = express.Router();

//react
import {renderToString} from 'react-dom/server';
import React from 'react';
import App from '../../src/App.js';

//redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../src/reducers/index';

//mongodb
const mongoose = require('mongoose');
import Post from '../models/postModel.js';


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
router.get('/:title', wrapAsync(async (req,res,next)=>{
    let currentPageData;
    const query = await Post.findOne({title: req.params.title});
    //if not found, query will be null;
    if(query){
        currentPageData = query.data;
    }
    else{
        throw new Error('page not found');
    }

    //using redux to send data from server to client
    //push page data into redux state
    const store = createStore(rootReducer);
    let preloadedState = store.getState();
    preloadedState.page.currentPage = 'post';
    preloadedState.page.currentPageData = currentPageData;
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
