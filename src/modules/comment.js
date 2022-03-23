import {call, put, takeEvery, delay} from 'redux-saga/effects';
import {createComment, editComment, deleteComment} from '../api/comment';

//pending switch
const PENDING_SWITCH = 'PENDING_SWITCH';

export const pendingSwitch = () => ({type: PENDING_SWITCH});

//comment create
const COMMENT_CREATE = 'COMMENT_CREATE';
const COMMENT_CREATE_SUCCESS = 'COMMENT_CREATE_SUCCESS';
const COMMENT_CREATE_FAIL = 'COMMENT_CREATE_FAIL';

export const commentCreate = (data) => ({type: COMMENT_CREATE, payload: data});
export const commentCreateSuccess = ()=>({type: COMMENT_CREATE_SUCCESS});
export const commentCreateFail = ()=>({type: COMMENT_CREATE_FAIL});

function* commentCreateSaga(action){
    yield put(pendingSwitch());
    try {
        yield call(createComment, action.payload);
        yield put(commentCreateSuccess());
    }catch(e){
        yield put(commentCreateFail());
    }
    yield put(pendingSwitch());
}

//comment edit
const COMMENT_EDIT = 'COMMENT_EDIT';
const COMMENT_EDIT_SUCCESS = 'COMMENT_EDIT_SUCCESS';
const COMMENT_EDIT_FAIL = 'COMMENT_EDIT_FAIL';

export const commentEdit = (data) => ({type: COMMENT_EDIT, payload: data});
export const commentEditSuccess = ()=>({type: COMMENT_EDIT_SUCCESS});
export const commentEditFail = ()=>({type: COMMENT_EDIT_FAIL});

function* commentEditSaga(action){
    yield put(pendingSwitch());
    try {
        yield call(editComment, action.payload);
        yield put(commentEditSuccess());
    }catch(e){
        yield put(commentEditFail());
    }
    yield put(pendingSwitch());
}

//comment delete
const COMMENT_DELETE = 'COMMENT_DELETE';
const COMMENT_DELETE_SUCCESS = 'COMMENT_DELETE_SUCCESS';
const COMMENT_DELETE_FAIL = 'COMMENT_DELETE_FAIL';

export const commentDelete = (data) => ({type: COMMENT_DELETE, payload: data});
export const commentDeleteSuccess = ()=>({type: COMMENT_DELETE_SUCCESS});
export const commentDeleteFail = ()=>({type: COMMENT_DELETE_FAIL});

function* commentDeleteSaga(action){
    yield put(pendingSwitch());
    try {
        yield call(deleteComment, action.payload);
        yield put(commentDeleteSuccess());
    }catch(e){
        yield put(commentDeleteFail());
    }
    yield put(pendingSwitch());
}

export function* commentSaga(){
    yield takeEvery(COMMENT_CREATE, commentCreateSaga);
    yield takeEvery(COMMENT_EDIT, commentEditSaga);
    yield takeEvery(COMMENT_DELETE, commentDeleteSaga);
}

const initialState = {
    isPending: false,
    isLastCommentCreateSuccess: null,
    isLastCommentEditSuccess: null,
    isLastCommentDeleteSuccess: null,
}

const commentReducer = (state=initialState, action) => {
    switch (action.type){
        case PENDING_SWITCH: {
            return {
                ...state,
                isPending: !state.isPending
            }
        }
        case COMMENT_CREATE_SUCCESS: {
            return {
                ...state,
                isLastCommentCreateSuccess: true,
            }
        }
        case COMMENT_CREATE_FAIL: {
            return {
                ...state,
                isLastCommentCreateSuccess: false,
            }
        }
        case COMMENT_EDIT_SUCCESS: {
            return {
                ...state,
                isLastCommentEditSuccess: true,
            }
        }
        case COMMENT_EDIT_FAIL: {
            return {
                ...state,
                isLastCommentEditSuccess: false,
            }
        }
        case COMMENT_DELETE_SUCCESS: {
            return {
                ...state,
                isLastCommentDeleteSuccess: true,
            }
        }
        case COMMENT_DELETE_FAIL: {
            return {
                ...state,
                isLastCommentDeleteSuccess: false,
            }
        }
        default: {
            return state;
        }
    }
}

export default commentReducer;