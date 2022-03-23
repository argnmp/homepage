import axios from 'axios';

export let createComment = (payload) => {
    return axios({
        method: 'post',
        url: '/api/comment',
        data: {
            depth: payload.depth,
            postId: payload.postId,
            parentCommentId: payload.parentCommentId,
            data: payload.data,
        }
    })
}

export let editComment = (payload) => {
    return axios({
        method: 'post',
        url: '/api/commentedit',
        data: {
            comment: payload.commentId,
            data: payload.data,
        }
    })
}

export let deleteComment = (payload) => {
    return axios({
        method: 'delete',
        url: `/api/comment/${payload._id}`
    })
}