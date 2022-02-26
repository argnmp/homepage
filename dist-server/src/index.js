"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _App = _interopRequireDefault(require("./App"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reducers = _interopRequireDefault(require("./reducers"));

var _reduxSaga = _interopRequireDefault(require("redux-saga"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//redux | redux-saga
const initialData = window.__INITIAL_DATA__;
delete window.__INITIAL_DATA__;
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const sagaMiddleware = (0, _reduxSaga.default)();
const store = (0, _redux.createStore)(_reducers.default, preloadedState, (0, _redux.compose)((0, _redux.applyMiddleware)(sagaMiddleware)));
const rootElement = document.getElementById('root');

_reactDom.default.hydrate( /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
  store: store
}, /*#__PURE__*/_react.default.createElement(_App.default, null)), rootElement);