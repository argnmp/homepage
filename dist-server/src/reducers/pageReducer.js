"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const initialState = {
  currentPage: null,
  currentPageData: null
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PAGE_LOAD':
      {
        return { ...state,
          currentPage: action.payload.currentPage,
          currentPageData: action.payload.currentPageData
        };
      }

    default:
      return state;
  }
};

var _default = categoryReducer;
exports.default = _default;