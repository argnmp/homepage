import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

const initialData = window.__INITIAL_DATA__;

const rootElement = document.getElementById('root');
ReactDom.hydrate(<App page={initialData.page} data={initialData.data} />, rootElement);
