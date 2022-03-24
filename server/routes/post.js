//express
const express = require('express');
import fs from 'fs';
import path from 'path';
const router = express.Router();

//markdown parser
import {marked} from 'marked';
marked.setOptions({
    headerPrefix: 'hid'
})

//react
import {renderToString} from 'react-dom/server';
import React from 'react';
import App from '../../src/App.js';

//redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../src/modules/index';

//mongodb
import Post from '../models/postModel.js';
import Comment from '../models/commentModel.js';

//modules
import {imageStateChangeAndDelete, imageStateRestore, imageDelete} from '../modules/imgSanitizer';
import { commentBuilder } from '../modules/commentBuilder.js';


const html = fs.readFileSync(
    path.resolve(__dirname, '../../../dist/index.html'),
    'utf8'
)

const categoryData = fs.readFileSync(
    path.resolve(__dirname, '../metadata/category.json')
)

//비동기 함수에 대한 에러처리 
function wrapAsync(fn) {
    return function(req, res, next) {
      // Make sure to `.catch()` any errors and pass them along to the `next()`
      // middleware in the chain, in this case the error handler.
      fn(req, res, next).catch(next);
    };
  }
// post new article
router.post('/', wrapAsync(async(req,res)=>{
    if(!req.user || req.user.level > 0){
        let err = new Error('Unauthorized');
        err.status = 401;
        throw err;
    }
    else{
        try{
            if(req.body.isNew){
                let title = req.body.title;
                let uri;
                uri = req.body.title.replace(/ /gi,"-");
                const sameTitleNum = await Post.countDocuments({title: title});
                if(sameTitleNum!==0) uri += `-${sameTitleNum}`;
                let author = req.user._id;
                
                //prevent html tag in mdData from error
                let rawData = req.body.data.replace(/</g,"&lt;").replace(/>/g,"&gt;"); 
                let mdData = rawData;

                let data = marked.parse(rawData);
                
                //delete all html tags to build preview string
                const regex = /(<([^>]+)>)/ig;
                let preview = data.replace(regex, "");
                preview = preview.replace(/\r?\n|\r/g, " ");
                preview = preview.substr(0,300);
                

                let category = req.body.category;
                let view = 0;
    
                let payload = new Post({
                    uri,
                    title,
                    author,
                    category,
                    mdData,
                    data,
                    view,
                    preview,
                    uploadDate: new Date()
                })  
    
                imageStateChangeAndDelete(data);
    
                await payload.save();
                res.status(201).json({
                    redirectUrl:`/post/${uri}` 
                });     
            }
            else {
                const query = await Post.findOne({uri: req.body.orgUri});
                if(!query){
                    let err = new Error('not found');
                    err.status = 404;
                    throw err;
                }
                await imageStateRestore(query.data);

                let title = req.body.title;
                let view = query.view;
                let uri = query.uri;

                if(query.title !== title) {
                    uri = req.body.title.replace(/ /gi,"-");
                    const sameTitleNum = await Post.countDocuments({title: req.body.title});
                    if(sameTitleNum!==0) uri += `-${sameTitleNum}`;
                }
                //prevent html tag in mdData from error
                let rawData = req.body.data.replace(/</g,"&lt;").replace(/>/g,"&gt;"); 
                let mdData = rawData;

                let data = marked.parse(rawData);
                let category = req.body.category;

                //delete all html tags to build preview string
                const regex = /(<([^>]+)>)/ig;
                let preview = data.replace(regex, "");
                preview = preview.replace(/\r?\n|\r/g, " ");
                preview = preview.substr(0,300);

                imageStateChangeAndDelete(data);

                const result = await Post.updateOne({uri: query.uri},{
                    uri: uri,
                    title: title,
                    mdData: mdData,
                    data: data,
                    category: category,
                    view: view,
                    preview: preview,
                });
                res.status(201).json({
                    redirectUrl:`/post/${uri}` 
                });     
            }
            

        }catch(e){
            console.log(e);
            if(!e){
                let err = new Error('Internal Server Error');
                err.status = 500;
                throw err;
            }
            else {
                throw e;
            }
            
        }

    }
}));

router.get('/:uri', wrapAsync(async (req,res,next)=>{
    try {
        let currentPageData;
        let currentPageMetadata;
        const query = await Post.findOne({uri: req.params.uri}).populate({path: 'author', select: 'name'});

        //if not found, query will be null;
        if(query){
            const result = await Post.updateOne({uri: query.uri},{
                view: query.view+1,
            });
            const comments = await Comment.find({post: query._id}).populate({path: 'author', select: 'name'}).sort({depth:-1, uploadDate: 1});
            comments.forEach(element => {
                element.childComments = [];
            });
            currentPageData = query.data;
            currentPageMetadata = {_id: query._id, uri: query.uri, title: query.title, author: query.author.name, uploadDate: query.uploadDate, view: query.view + 1, preview: query.preview,
            comments: [...commentBuilder(comments)],
            };
        }
        else{
            let err = new Error('not found');
            err.status = 404;
            throw err;
        }

        //using redux to send data from server to client
        //push page data into redux state
        const store = createStore(rootReducer);
        let preloadedState = store.getState();
        preloadedState.page.currentPage = 'post';
        preloadedState.page.currentPageData = currentPageData;
        preloadedState.page.currentPageMetadata = currentPageMetadata;
        preloadedState.category.categoryData = JSON.parse(categoryData);
        if(!req.user){
            preloadedState.user.isLogined = false;
            preloadedState.user.name = "";
        }
        else{
            preloadedState.user.isLogined = true;
            preloadedState.user.name = req.user.name;
            preloadedState.user.email = req.user.email;
            preloadedState.user._id = req.user._id;
            preloadedState.user.level = req.user.level;

        }

        let renderString = renderToString(<Provider store={store}><App/></Provider>);

        const result = html
            .replace('__REDUX_STATE_FROM_SERVER__', JSON.stringify(preloadedState))
            .replace(
                '<div id="root"></div>',
                `<div id="root">${renderString}</div>`
            )
        res.send(result);

    } catch (e){
        if(!e){
            let err = new Error('Internal Server Error');
            err.status = 500;
            throw err;
        }
        else {
            throw e;
        }
    }
}));
router.delete('/:uri', wrapAsync(async (req,res,next)=>{
    if(!req.user || req.user.level > 0){
        let err = new Error('Unauthorized');
        err.status = 401;
        throw err;
    }
    else {
        try {
            const query = await Post.findOne({uri: req.params.uri});
            if(!query){
                let err = new Error('not found');
                err.status = 404;
                throw err;
            }
            imageDelete(query.data);

            await Comment.deleteMany({post: query._id});
            const result = await Post.deleteOne({uri: req.params.uri});
            if(result.deletedCount >= 0){
                //status 204는 response body 가 없음을 의미하여 200을 사용해야함.
                res.status(200).json({
                    redirectUrl: `/`
                });
            }else {
                let err = new Error('not found');
                err.status = 404;
                throw err;
            }

        } catch (e){
            if(!e){
                let err = new Error('Internal Server Error');
                err.status = 500;
                throw err;
            }
            else {
                throw e;
            }
        }
    }
   
}));


module.exports = router;
