import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import categoryReducer from './category';
import pageReducer from './page'
import userReducer from './user';
import uploadReducer, {uploadSaga} from './upload';

export function* rootSaga() {
    yield all([uploadSaga()]);
}
const rootReducer = combineReducers({
    category: categoryReducer,
    page: pageReducer,
    user: userReducer,
    upload: uploadReducer
});

export default rootReducer;


