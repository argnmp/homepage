"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _server = require("react-dom/server");

var _react = _interopRequireDefault(require("react"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _index = _interopRequireDefault(require("../../src/reducers/index"));

var _App = _interopRequireDefault(require("../../src/App.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const express = require('express');

const router = express.Router(); //this should not be changed. dependent to 'dist'

const html = _fs.default.readFileSync(_path.default.resolve(__dirname, '../../../dist/index.html'), 'utf8');

const pageData = _fs.default.readFileSync(_path.default.resolve(__dirname, '../static/index/index.html'), 'utf8'); //category metadata -> change to automatically change metadata


const categoryData = _fs.default.readFileSync(_path.default.resolve(__dirname, '../metadata/category.json'));

router.get('/', (req, res) => {
  //using redux to send data from server to client
  //push page data into redux state
  const store = (0, _redux.createStore)(_index.default);
  let preloadedState = store.getState();
  preloadedState.page.currentPage = 'index';
  preloadedState.page.currentPageData = pageData;
  preloadedState.category.categoryData = JSON.parse(categoryData);
  let renderString = (0, _server.renderToString)( /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: store
  }, /*#__PURE__*/_react.default.createElement(_App.default, null)));
  const result = html.replace('__REDUX_STATE_FROM_SERVER__', JSON.stringify(preloadedState)).replace('<div id="root"></div>', `<div id="root">${renderString}</div>`);
  res.send(result);
});
module.exports = router;