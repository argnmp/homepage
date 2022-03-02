"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const postSchema = new _mongoose.default.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    required: true,
    default: new Date()
  },
  data: {
    type: String
  }
}, {
  collection: 'post'
});

var _default = _mongoose.default.model('post', postSchema);

exports.default = _default;