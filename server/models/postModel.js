import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    uri: {type: String, required: true,},
    title: {type: String, required: true,},
    author: {type: String, required: true},
    uploadDate: {type: Date, required: true, default: new Date()},
    category: {type:String, required: true},
    view: {type:Number, required: true},
    preview: {type: String, required: true},
    mdData: {type: String},
    data: {type: String}
});
const model = mongoose.model(`post`,postSchema, `post`);

export default model;
