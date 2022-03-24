import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    uri: {type: String, required: true,},
    title: {type: String, required: true,},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    uploadDate: {type: Date, required: true, default: new Date()},
    category: {type:String, required: true},
    view: {type:Number, required: true},
    preview: {type: String, required: true, default: ""},
    mdData: {type: String},
    data: {type: String}
});

postSchema.virtual('comments', {
    ref: 'comment',
    localField: '_id',
    foreignField: 'post',
})

postSchema.set('toObject', {virtuals: true});
postSchema.set('toJSON', {virtuals: true});

const model = mongoose.model(`post`,postSchema, `post`);

export default model;
