import axios from 'axios';

export let deletePost = (uri) => {
    return axios({
        method: 'delete',
        url: `/post/${uri}`,
    })
}