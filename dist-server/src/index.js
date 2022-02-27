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
//for developing server + client
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__; //for developing client

/*
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
        currentPage: 'profile',
        currentPageData: '<h1>clienttest</h1>',
    }
}
*/

const sagaMiddleware = (0, _reduxSaga.default)();
const store = (0, _redux.createStore)(_reducers.default, preloadedState, (0, _redux.compose)((0, _redux.applyMiddleware)(sagaMiddleware)));
const rootElement = document.getElementById('root');
/*ReactDom.render(
    <Provider store={store}><App/></Provider>
    ,rootElement);*/

_reactDom.default.hydrate( /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
  store: store
}, /*#__PURE__*/_react.default.createElement(_App.default, null)), rootElement);