import {combineReducers} from 'redux';
import categoryReducer from './categoryReducer';
import pageReducer from './pageReducer'

const rootReducer = combineReducers({
    category: categoryReducer,
    page: pageReducer
});

export default rootReducer;


