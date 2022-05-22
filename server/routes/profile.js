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

const html = fs.readFileSync(
    path.resolve(__dirname, '../../../dist/index.html'),
    'utf8'
)

const pageData = fs.readFileSync(
    path.resolve(__dirname, '../static/profile/index.html'),
    'utf8'
)
//비동기 함수에 대한 에러처리 
function wrapAsync(fn) {
    return function(req, res, next) {
      // Make sure to `.catch()` any errors and pass them along to the `next()`
      // middleware in the chain, in this case the error handler.
      fn(req, res, next).catch(next);
    };
  }

router.get('/', wrapAsync(async (req,res)=>{
    const app = req.app;
    try{
        //using redux to send data from server to client
        //push page data into redux state
        const store = createStore(rootReducer);
        let preloadedState = store.getState();
        preloadedState.page.currentPage = 'profile';
        preloadedState.page.currentPageData = pageData;
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

    }catch{
        let err = new Error('Internal Server Error');
        err.status = 500;
        throw err;

    }

}));


module.exports = router;
