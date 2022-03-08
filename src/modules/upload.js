import {call, put, takeEvery} from 'redux-saga/effects';
import { uploadImage, uploadPost } from '../api/upload';

const IMG_UPLOAD = 'IMG_UPLOAD';
const IMG_UPLOAD_SUCCESS = 'IMG_UPLOAD_SUCCESS'
const IMG_UPLOAD_FAIL = 'IMG_UPLOAD_FAIL'

const POST_UPLOAD = 'POST_UPLOAD';
const POST_UPLOAD_SUCCESS = 'POST_UPLOAD_SUCCESS'
const POST_UPLOAD_FAIL = 'POST_UPLOAD_FAIL'

export const imgUpload = (images) => ({type: IMG_UPLOAD, payload: images});
export const imgUploadSuccess = (uris)=>({type: IMG_UPLOAD_SUCCESS, payload: uris});
export const imgUploadFail = ()=>({type: IMG_UPLOAD_FAIL});

export const postUpload = (d) => ({type: POST_UPLOAD, payload: d});
export const postUploadSuccess = ()=>({type: POST_UPLOAD_SUCCESS});
export const postUploadFail = ()=>({type: POST_UPLOAD_FAIL});

function* imgUploadSaga(action){
    try {
        const res = yield call(uploadImage,action.payload);   
        yield put(imgUploadSuccess(res.data));
    }catch(e){
        yield put(imgUploadFail());
    }
}

function* postUploadSaga(action){
    try {
        yield call(uploadPost, action.payload);
        yield put(postUploadSuccess());
    }catch(e){
        yield put(postUploadFail());
    }

}

export function* uploadSaga(){
    yield takeEvery(IMG_UPLOAD, imgUploadSaga);
    yield takeEvery(POST_UPLOAD, postUploadSaga);
}

const initialState = {
    isLastPostUploadSuccess: null,
    isLastImgUploadSuccess: null, 
    imgUris: null, 
}
const uploadReducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        case POST_UPLOAD_SUCCESS: {
            return {
                ...state,
                isLastPostUploadSuccess: true,
            }
        }
        case POST_UPLOAD_FAIL: {
            return {
                ...state,
                isLastPostUploadSuccess: false,
            }
        } 
        case IMG_UPLOAD_SUCCESS: {
            return {
                ...state,
                isLastImgUploadSuccess: true,
                imgUris: action.payload,
            }
        }
        case IMG_UPLOAD_FAIL: {
            return {
                ...state,
                isLastImgUploadSuccess: false,
                imgUris: null,
            }
        }

        default: 
            return state;
    }
}

export default uploadReducer;
