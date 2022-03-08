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

//this should not be changed. dependent to 'dist'
const html = fs.readFileSync(
    path.resolve(__dirname, '../../../dist/index.html'),
    'utf8'
)

//category metadata -> change to automatically change metadata
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

router.get('/', wrapAsync(async (req,res)=>{
    if(!req.user){
        let err = new Error('Unauthorized');
        err.status = 401;
        throw err;
    }
    else{
        try{
            //using redux to send data from server to client
            //push page data into redux state
            const store = createStore(rootReducer);
            let preloadedState = store.getState();
            preloadedState.page.currentPage = 'upload';
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
            let err = new Error('internal serverError');
            err.status = 500;
            throw err
            
        }
    }

}));


module.exports = router;
