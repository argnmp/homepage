const express = require('express');
import fs from 'fs';
import path from 'path';
import {renderToString} from 'react-dom/server';
import React from 'react';
import App from '../../App.js';
const router = express.Router();

const html = fs.readFileSync(
    path.resolve(__dirname, '../../index.html'),
    'utf8'
)
const data = fs.readFileSync(
    path.resolve(__dirname,'../static/profile/index.html'),
    'utf8'
)

router.get('/', (req,res)=>{
    let renderString = renderToString(<App page="home" data={data}/>);
    const result = html.replace(
        '<div id="root"></div>',
        `<div id="root">${renderString}</div>`
    );
    res.send(result);
})

module.exports = router;
