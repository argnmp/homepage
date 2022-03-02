"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _server = require("react-dom/server");

var _react = _interopRequireDefault(require("react"));

var _App = _interopRequireDefault(require("../../src/App.js"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _index = _interopRequireDefault(require("../../src/reducers/index"));

var _postModel = _interopRequireDefault(require("../models/postModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//express
const express = require('express');

const router = express.Router(); //react

//mongodb
const mongoose = require('mongoose');

const html = _fs.default.readFileSync(_path.default.resolve(__dirname, '../../../dist/index.html'), 'utf8');

const categoryData = _fs.default.readFileSync(_path.default.resolve(__dirname, '../metadata/category.json')); //비동기 함수에 대한 에러처리 


function wrapAsync(fn) {
  return function (req, res, next) {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(req, res, next).catch(next);
  };
}

router.get('/:title', wrapAsync(async (req, res, next) => {
  let currentPageData;
  const query = await _postModel.default.findOne({
    title: req.params.title
  }); //if not found, query will be null;

  if (query) {
    currentPageData = query.data;
  } else {
    throw new Error('page not found');
  } //using redux to send data from server to client
  //push page data into redux state


  const store = (0, _redux.createStore)(_index.default);
  let preloadedState = store.getState();
  preloadedState.page.currentPage = 'post';
  preloadedState.page.currentPageData = currentPageData;
  preloadedState.category.categoryData = JSON.parse(categoryData);
  let renderString = (0, _server.renderToString)( /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: store
  }, /*#__PURE__*/_react.default.createElement(_App.default, null)));
  const result = html.replace('__REDUX_STATE_FROM_SERVER__', JSON.stringify(preloadedState)).replace('<div id="root"></div>', `<div id="root">${renderString}</div>`);
  res.send(result);
}));
module.exports = router;