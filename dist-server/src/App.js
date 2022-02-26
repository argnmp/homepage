"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _profile = require("./page/profile");

var _post = require("./page/post");

var _ = require("./page/404");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const App = () => {
  const currentPage = (0, _reactRedux.useSelector)(state => state.page.currentPage);

  let pageRenderer = currentPage => {
    switch (currentPage) {
      case 'profile':
        return /*#__PURE__*/_react.default.createElement(_profile.Profile, null);

      case 'post':
        return /*#__PURE__*/_react.default.createElement(_post.Post, null);

      default:
        return /*#__PURE__*/_react.default.createElement(_.PNF, null);
    }
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, pageRenderer(currentPage));
};

var _default = App;
exports.default = _default;