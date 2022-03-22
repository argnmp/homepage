import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'post',
    },
    data: {type: String, required: true},
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    uploadDate: {type: Date, required: true, default: new Date()},
    
})

const model = mongoose.model(`comment`,commentSchema, `comment`);
export default model;