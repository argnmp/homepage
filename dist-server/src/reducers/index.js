"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _categoryReducer = _interopRequireDefault(require("./categoryReducer"));

var _pageReducer = _interopRequireDefault(require("./pageReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rootReducer = (0, _redux.combineReducers)({
  category: _categoryReducer.default,
  page: _pageReducer.default
});
var _default = rootReducer;
exports.default = _default;