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
        _id: 1232,
        name: "김태현",
    },
    page: {
        currentPage: 'register',
        currentPageData: postex,
        currentPageMetadata: {
            currentCategory: 'documents',
            totalPost: 13,
            _id: '62393b4fb03766e4b9dcd68d',
            uri: 'decode-ways',
            title: "새로운 블로그를 제작하게 되었습니다",
            author: "kimtahen",
            uploadDate: '2022-03-04 14:53:55',
            views: 40,
            comments: [
                {
                    data: "hello1 world",
                    _id: "faegaegaegae",
                    author: {_id:1234, name: 'kimtahen'},
                    uploadDate: '2022-03-04 14:53:55',
                    childComments: [
                        {
                            data: 'sub comment',
                            author: { _id: 1234, name: 'kimtahen' },
                            uploadDate: '2022-03-04 14:53:55',
                            childComments: [
                                {
                                    data: 'subsubcomment',
                                    author: { _id: 1234, name: 'kimtahen' },
                                    uploadDate: '2022-03-04 14:53:55',
                                    childComments: [
                                        {
                                            data: 'subsubsubcomment',
                                            author: { _id: 1234, name: 'kimtahen' },
                                            uploadDate: '2022-03-04 14:53:55',
                                            childComments: [
                                                {
                                                    data: 'subsubsubsubcomment',
                                                    author: { _id: 1234, name: 'kimtahen' },
                                                    uploadDate: '2022-03-04 14:53:55',
                                                    childComments: [] 
                                                }
                                            ]
                                        }
                                    ],
                                }
                            ] 
                        },
                        {
                            data: 'sub2 comment',
                            author: { _id: 1234, name: 'kimtahen' },
                            uploadDate: '2022-03-04 14:53:55',
                            childComments: [],
                        },
                        {
                            data: 'sub3 comment',
                            author: { _id: 1234, name: 'kimtahen' },
                            uploadDate: '2022-03-04 14:53:55',
                            childComments: [
                                {
                                    data: 'comment from test',
                                    author: {_id: 1232, name: 'test'},
                                    uploadDate: '2022-02-23 11:23:22',
                                    childComments: [],
                                }
                            ],
                        }
                    ]
                },
                {
                    data: "hello2 world",
                    author: {_id:1234, name: 'kimtahen'},
                    uploadDate: '2022-03-04 14:53:55',
                    childComments: [],

                }
            ]
        
        }
    
    }
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

//   /*

ReactDom.hydrate(
    <Provider store={store}><App/></Provider>
    ,rootElement);
//*/
    
