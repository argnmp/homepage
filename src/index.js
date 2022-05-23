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
const pageMetadata = {
    code: 
`use std::fs::File;
use std::io::{self, BufRead};

fn tracks(artist: &str) -> io::Result<io::Lines<io::BufReader<File>>> {
    let album = File::open(artist)?;
    Ok(io::BufReader::new(album).lines())
}
fn main () {    
    if let Ok(computer) = tracks("radiohead.txt") {
        for track in computer {
            if let Ok(title) = track {
                println!("{}", title);
            }
        }
    }
}`,
    output:[
        'Airbag',
        'Paranoid Android',
        'Subterranean Homesick Alien',
        'Exit Music (For a Film)',
        'Let Down',
        'Karma Police',
        'Fitter Happier',
        'Electioneering',
        'Climbing Up the Walls',
        'No Surprises',
        'Lucky',
        'The Tourist',
    ],
    hi:[
        'Ok(computer)',
        'radiohead.txt',
    ],
    emb: `<iframe width="100%" height="315" src="https://www.youtube.com/embed/u5CVsCnxyXg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`, 


}
let preloadedState = {
   category: {
       categoryData: {
           "profile": false,
       }
   },
   page: {
       currentPage: 'index',
       currentPageMetadata: pageMetadata, 
   }
}
*/
/*
import postlist from './pagelist.js';
import postex from './postex';
let preloadedState = {
    category:{
        categoryData: {
            categoryList: {
            "profile":false,
            "documents": {
                "cpp": true,
                "javascript": true,
                "nodejs": true,
                "reactjs": true
            },
            "daily": true
            },
            categoryCount: {
                profile: null,
                documents : 12,
                cpp: 12,
                javascript: 11,
                nodejs: 0,
                reactjs: 4,
                daily: 39,
            }
        }
        
    },
    user: {
        isLogined: true,
        _id: 1232,
        name: "김태현",
    },
    page: {
        currentPage: 'post',
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
    
