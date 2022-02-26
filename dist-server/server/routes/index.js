"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _server = require("react-dom/server");

var _react = _interopRequireDefault(require("react"));

var _App = _interopRequireDefault(require("../../src/App.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const express = require('express');

const router = express.Router();

const html = _fs.default.readFileSync(_path.default.resolve(__dirname, '../../../dist/index.html'), 'utf8');

const pageData = _fs.default.readFileSync(_path.default.resolve(__dirname, '../static/profile/index.html'), 'utf8');

router.get('/', (req, res) => {
  let renderString = (0, _server.renderToString)( /*#__PURE__*/_react.default.createElement(_App.default, {
    page: "profile",
    data: pageData
  }));
  let initialData = {
    page: 'profile',
    data: pageData
  };
  const result = html.replace('__DATA_FROM_SERVER__', JSON.stringify(initialData)).replace('<div id="root"></div>', `<div id="root">${renderString}</div>`);
  res.send(result);
});
router.get('/:id', (req, res) => {
  res.sendFile(_path.default.join(__dirname, '../public/', req.params.id));
});
module.exports = router;