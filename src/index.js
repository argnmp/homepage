import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

//redux | redux-saga
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import rootReducer, {rootSaga} from './modules';
import createSagaMiddleware from 'redux-saga';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, preloadedState, compose(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

const rootElement = document.getElementById('root');

ReactDom.hydrate(
    <Provider store={store}><App/></Provider>
    ,rootElement);
    
