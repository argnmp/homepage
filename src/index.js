import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

//redux | redux-saga
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';


//for developing server + client
///*
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
//*/
//for developing client

/*
import postlist from './pagelist.js';
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
    page: {
        currentPage: 'list',
        currentPageData: postlist,
        currentPageMetadata: {
            startPage : 1,
            endPage : 2,
            totalPage : 2,
            currentPage : 1,
        }
    }
}
*/


const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, preloadedState, compose(applyMiddleware(sagaMiddleware)));

const rootElement = document.getElementById('root');
/*
ReactDom.render(
    <Provider store={store}><App/></Provider>
    ,rootElement);
    */

 //   /*

ReactDom.hydrate(
    <Provider store={store}><App/></Provider>
    ,rootElement);
  //  */
    
