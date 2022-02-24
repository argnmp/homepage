import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

const data = require('../server/static/category/algorithm/decode-ways/index.html');
const rootElement = document.getElementById('root');
ReactDom.render(<App page='category' data={data.default}/>, rootElement);
