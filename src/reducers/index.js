import {combineReducers} from 'redux';
import categoryReducer from './categoryReducer';
import pageReducer from './pageReducer'
import userReducer from './userReducer';

const rootReducer = combineReducers({
    category: categoryReducer,
    page: pageReducer,
    user: userReducer
});

export default rootReducer;


