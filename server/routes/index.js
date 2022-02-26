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

const html = fs.readFileSync(
    path.resolve(__dirname, '../../../dist/index.html'),
    'utf8'
)

const pageData = fs.readFileSync(
    path.resolve(__dirname, '../static/profile/index.html'),
    'utf8'
)
const categoryData = fs.readFileSync(
    path.resolve(__dirname, '../metadata/category.json')
)

router.get('/', (req,res)=>{

    //using redux to send data from server to client
    //push page data into redux state
    const store = createStore(rootReducer);
    let preloadedState = store.getState();
    preloadedState.page.currentPage = 'profile';
    preloadedState.page.currentPageData = pageData;
    preloadedState.category.categoryData = JSON.parse(categoryData);

    let renderString = renderToString(<Provider store={store}><App/></Provider>);

    const result = html
    .replace('__REDUX_STATE_FROM_SERVER__', JSON.stringify(preloadedState))
    .replace(
        '<div id="root"></div>',
        `<div id="root">${renderString}</div>`
    )
    res.send(result);
});


module.exports = router;
