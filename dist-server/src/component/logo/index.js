"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logo = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Logo = () => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "logo-wrapper"
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: "/"
  }, "kimtahen.com"));
};

exports.Logo = Logo;