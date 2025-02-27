import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import categoryReducer from './category';
import pageReducer from './page'
import userReducer from './user';
import uploadReducer, {uploadSaga} from './upload';
import commonReducer, {commonSaga} from './common';
import commentReducer, {commentSaga} from './comment';

export function* rootSaga() {
    yield all([uploadSaga(), commonSaga(), commentSaga()]);
}
const rootReducer = combineReducers({
    category: categoryReducer,
    page: pageReducer,
    user: userReducer,
    upload: uploadReducer,
    common: commonReducer,
    comment: commentReducer
});

export default rootReducer;


