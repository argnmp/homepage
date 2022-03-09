import axios from 'axios';

export let uploadImage = (images) => {
    let formData = new FormData();
    for(let i in images){
        formData.append('image',images[i]);
    }
    return axios({
        method: 'post',
        url: "/api/image",
        data: formData,
        headers: {"content-Type": "multipart/form-data"}
    }); 
}

export let uploadPost = (payload) => {
        return axios({
            method: 'post',
            url: "/post",
            data: {
                isNew: payload.orgUri === '' ? true : false,
                orgUri: payload.orgUri,
                title: payload.title,
                category: payload.category,
                data: payload.data,
            }
        })
    
}
