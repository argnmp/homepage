import {call, put, takeEvery} from 'redux-saga/effects';
import { deletePost } from '../api/common';

const POST_DELETE = 'POST_DELETE';
const POST_DELETE_SUCCESS = 'POST_DELETE_SUCCESS';
const POST_DELETE_FAIL = 'POST_DELETE_FAIL';

export const postDelete = (uri) => ({type: POST_DELETE, payload: uri});
export const postDeleteSuccess = (redirectUrl)=>({type: POST_DELETE_SUCCESS, payload: redirectUrl});
export const postDeleteFail = ()=>({type: POST_DELETE_FAIL});

function* postDeleteSaga(action){
    try {
        const res = yield call(deletePost, action.payload);
        console.log(res);
        yield put(postDeleteSuccess(res.data.redirectUrl));
    }catch(e){
        yield put(postDeleteFail());
    }
}

export function* commonSaga(){
    yield takeEvery(POST_DELETE, postDeleteSaga);
}

const initialState = {
    isLastFunctionSuccess: null,
    redirectUrl: '',
}

const commonReducer = (state = initialState, action) => {
    switch (action.type){
        case POST_DELETE_SUCCESS: {
            return {
                ...state,
                isLastFunctionSuccess: true,
                redirectUrl: action.payload,
            }
        }
        case POST_DELETE_FAIL: {
            return {
                ...state,
                isLastFunctionSuccess: false,
            }
        }
        default: {
            return state;
        }
    }
}

export default commonReducer;