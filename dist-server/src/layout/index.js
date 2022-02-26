"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layout = void 0;

var _react = _interopRequireWildcard(require("react"));

var _logo = require("../component/logo");

var _category = require("../component/category");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Layout = ({
  children
}) => {
  const [categoryToggle, setCategoryToggle] = (0, _react.useState)(false);

  let onToggle = () => setCategoryToggle(!categoryToggle);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: `panel-wrapper category-${categoryToggle ? 'on' : 'off'}`
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "panel-menu"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "panel-menu-inner"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "a"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `bg-btn ${categoryToggle ? 'btn-open' : ''}`,
    onClick: onToggle
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "burger-btn"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "b"
  }, /*#__PURE__*/_react.default.createElement(_logo.Logo, null)), /*#__PURE__*/_react.default.createElement("div", {
    className: "c"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "category-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_category.Category, null))))), /*#__PURE__*/_react.default.createElement("div", {
    className: `panel-smmd-category-${categoryToggle ? 'on' : 'off'} `
  }, /*#__PURE__*/_react.default.createElement(_category.Category, null)), /*#__PURE__*/_react.default.createElement("div", {
    className: "panel-content"
  }, /*#__PURE__*/_react.default.createElement("div", null, children)));
};

exports.Layout = Layout;