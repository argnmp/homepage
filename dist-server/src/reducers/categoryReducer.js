"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const initialState = {
  categoryData: null
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CATEGORY_LOAD':
      {
        return { ...state,
          categoryData: action.payload.categoryData
        };
      }

    default:
      return state;
  }
};

var _default = categoryReducer;
exports.default = _default;