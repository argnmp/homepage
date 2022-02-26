const express = require('express');
import fs from 'fs';
import path from 'path';
import {renderToString} from 'react-dom/server';
import React from 'react';
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

router.get('/', (req,res)=>{
    let renderString = renderToString(<App page="profile" data={pageData}/>);
    let initialData = {
        page: 'profile',
        data: pageData
    }
    const result = html
    .replace(
        '__DATA_FROM_SERVER__',
        JSON.stringify(initialData)
    )
    .replace(
        '<div id="root"></div>',
        `<div id="root">${renderString}</div>`
    )
    res.send(result);
});
router.get('/:id', (req,res)=>{
    res.sendFile(path.join(__dirname, '../public/', req.params.id));
})


module.exports = router;
