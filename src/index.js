import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

//redux | redux-saga
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';

const initialData = window.__INITIAL_DATA__;
delete window.__INITIAL_DATA__;

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, preloadedState, compose(applyMiddleware(sagaMiddleware)));

const rootElement = document.getElementById('root');
ReactDom.hydrate(
    <Provider store={store}><App/></Provider>
    ,rootElement);
