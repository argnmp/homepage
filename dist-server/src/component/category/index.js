"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Category = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Category = () => {
  const list = (0, _reactRedux.useSelector)(state => state.category.categoryData);

  let getUrl = (page, isPost, upperPage) => {
    let targetUrl;

    if (isPost) {
      if (upperPage == null) targetUrl = `/category/${page}`;else targetUrl = `/category/${upperPage}/${page}`;
    } else {
      targetUrl = `/${page}`;
    }

    return targetUrl;
  };

  let createCategory = (list, isUpper, upperPage) => {
    let returnElement = [];

    for (let i in list) {
      if (typeof list[i] == 'object') {
        const targetUrl = getUrl(i, true, upperPage);
        returnElement.push( /*#__PURE__*/_react.default.createElement("li", {
          key: i,
          onClick: e => {
            e.stopPropagation();
            document.location.href = targetUrl;
          }
        }, i, createCategory(list[i], false, i))); //stopPropagation이 없다면 onclick 이벤트가 버블링 되어서 상위의 카테고리가 마지막으로 눌리게 됨. 이것때문에 많이 고생함..
      } else {
        const targetUrl = getUrl(i, list[i], upperPage);
        returnElement.push( /*#__PURE__*/_react.default.createElement("li", {
          key: i,
          onClick: e => {
            e.stopPropagation();
            document.location.href = targetUrl;
          }
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

  (0, _react.useEffect)(() => {
    createCategory(list, true, null);
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "header"
  }, /*#__PURE__*/_react.default.createElement("span", null, "Category")), createCategory(list, true, null), /*#__PURE__*/_react.default.createElement("div", {
    className: "header"
  }));
};

exports.Category = Category;