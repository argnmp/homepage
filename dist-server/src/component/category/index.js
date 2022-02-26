"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Category = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let list;

const Category = () => {
  const moveHref = page => {
    document.location.href = `/${page}`;
  };

  let createCategory = (list, isUpper) => {
    let returnElement = [];

    for (let i in list) {
      if (typeof list[i] == 'object') {
        //returnElement.push(<li key={i}><span className="link-item" onClick={()=>moveHref(i)}>{i}</span>{createCategory(list[i], false)}</li>)        
        returnElement.push( /*#__PURE__*/_react.default.createElement("li", {
          key: i,
          onClick: () => moveHref(i)
        }, i, createCategory(list[i], false)));
      } else {
        returnElement.push( /*#__PURE__*/_react.default.createElement("li", {
          key: i,
          onClick: () => moveHref(i)
        }, i));
      }
    }

    if (isUpper) {
      return /*#__PURE__*/_react.default.createElement("ul", {
        className: "upper-category-list"
      }, returnElement);
    } else {
      return /*#__PURE__*/_react.default.createElement("ul", {
        className: "lower-category-list"
      }, returnElement);
    }
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "header"
  }, /*#__PURE__*/_react.default.createElement("span", null, "Category")), createCategory(list, true), /*#__PURE__*/_react.default.createElement("div", {
    className: "header"
  }));
};

exports.Category = Category;