import {call, put, takeEvery, delay} from 'redux-saga/effects';
import { deletePost } from '../api/common';

//pending switch
const PENDING_SWITCH = 'PENDING_SWITCH';

export const pendingSwitch = () => ({type: PENDING_SWITCH});

//post deletion
const POST_DELETE = 'POST_DELETE';
const POST_DELETE_SUCCESS = 'POST_DELETE_SUCCESS';
const POST_DELETE_FAIL = 'POST_DELETE_FAIL';

export const postDelete = (uri) => ({type: POST_DELETE, payload: uri});
export const postDeleteSuccess = (redirectUrl)=>({type: POST_DELETE_SUCCESS, payload: redirectUrl});
export const postDeleteFail = ()=>({type: POST_DELETE_FAIL});

function* postDeleteSaga(action){
    yield put(pendingSwitch());
    try {
        const res = yield call(deletePost, action.payload);
        yield put(postDeleteSuccess(res.data.redirectUrl));
    }catch(e){
        yield put(postDeleteFail());
    }
    yield put(pendingSwitch());
}

// switch color
const COLOR_SWITCH = 'COLOR_SWITCH';
export const colorSwitch = (colorState) => ({type: COLOR_SWITCH, payload: colorState});

// tocheader state
const TOCHEADER_SET = 'TOCHEADER_SET';
export const tocheaderSet = (title) => ({type: TOCHEADER_SET, payload: title});



export function* commonSaga(){
    yield takeEvery(POST_DELETE, postDeleteSaga);
}


const initialState = {
    colorState: false,
    isPending: false,
    isLastPostDeletionSuccess: null,
    redirectUrl: '',
    tocheaderTitle: '',
}

const commonReducer = (state = initialState, action) => {
    switch (action.type){
        case COLOR_SWITCH: {
            return {
                ...state,
                colorState: action.payload,
            }
        }
        case PENDING_SWITCH: {
            return {
                ...state,
                isPending: !state.isPending
            }
        }
        case POST_DELETE_SUCCESS: {
            return {
                ...state,
                isLastPostDeletionSuccess: true,
                redirectUrl: action.payload,
            }
        }
        case POST_DELETE_FAIL: {
            return {
                ...state,
                isLastPostDeletionSuccess: false,
            }
        }
        case TOCHEADER_SET: {
            return {
                ...state,
                tocheaderTitle: action.payload,
            }
        }
        default: {
            return state;
        }
    }
}

export default commonReducer;