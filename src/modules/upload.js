import {call, put, takeEvery} from 'redux-saga/effects';
import { uploadImage, uploadImageTest } from '../api/upload';

const IMG_UPLOAD = 'IMG_UPLOAD';
const IMG_UPLOAD_SUCCESS = 'IMG_UPLOAD_SUCCESS'
const IMG_UPLOAD_FAIL = 'IMG_UPLOAD_FAIL'

export const imgUpload = (images) => ({type: IMG_UPLOAD, payload: images});
export const imgUploadSuccess = (uris)=>({type: IMG_UPLOAD_SUCCESS, payload: uris});
export const imgUploadFail = ()=>({type: IMG_UPLOAD_FAIL});

function* imgUploadSaga(action){
    try {
        const res = yield call(uploadImage,action.payload);   
        yield put(imgUploadSuccess(res.data));
    }catch(e){
        yield put(imgUploadFail());
    }
}

export function* uploadSaga(){
    yield takeEvery(IMG_UPLOAD, imgUploadSaga);
}

const initialState = {
    isLastImgUploadSuccess: null, 
    imgUris: null, 
}
const uploadReducer = (state = initialState, action) => {
    switch (action.type) {
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
