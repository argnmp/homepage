import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {type: String, required: true,},
    author: {type: String, required: true},
    uploadDate: {type: Date, required: true, default: new Date()},
    data: {type: String}
},{collection: 'post'})

export default mongoose.model('post',postSchema);
