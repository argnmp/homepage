import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

//redux | redux-saga
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import rootReducer, {rootSaga} from './modules';
import createSagaMiddleware from 'redux-saga';


//for developing server + client
///*
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
//*/

//for developing client

/*
import postlist from './pagelist.js';
import postex from './postex';
let preloadedState = {
    category:{
        categoryData: {
            "profile":false,
            "documents": {
                "cpp": true,
                "javascript": true,
                "nodejs": true,
                "reactjs": true
            },
            "daily": true
        }
        
    },
    user: {
        isLogined: true,
        name: "김태현",
    },
    page: {
        currentPage: 'post',
        currentPageData: postex,
        currentPageMetadata: {
            uri: 'decode-ways',
            title: "새로운 블로그를 제작하게 되었습니다",
            author: "kimtahen",
            uploadDate: '2022-03-04 14:53:55',
        }
        
    },
    
}

*/

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, preloadedState, compose(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

const rootElement = document.getElementById('root');
/*
ReactDom.render(
    <Provider store={store}><App/></Provider>
    ,rootElement);
  */

//    /*

ReactDom.hydrate(
    <Provider store={store}><App/></Provider>
    ,rootElement);
// */
    
