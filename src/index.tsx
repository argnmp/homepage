import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

const data = require('../server/content/algorithm/index.html');
const rootElement = document.getElementById('root');
ReactDom.render(<App page='profile' data={data.default}/>, rootElement);
