import axios from 'axios';

export let uploadImage = (images) => {
    console.log('clinet',images);
    let formData = new FormData();
    for(let i in images){
        formData.append('image',images[i]);
    }
    //formData.append('image',images);
    return axios({
        method: 'post',
        url: "/api/image",
        data: formData,
        headers: {"content-Type": "multipart/form-data"}
    }); 
}
export let uploadImageTest = (images) => {
    return new Promise((resolve)=>setTimeout(()=>{
        resolve('/testuri');
    },3000));
}
