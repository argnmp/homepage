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
        defalut: null,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    uploadDate: {type: Date, required: true},
    editDate: {type: Date, default: null},
    depth: {type: Number, required: true},
    isDeleted: {type: Boolean, default: false},
    
})

commentSchema.virtual('comments', {
    ref: 'comment',
    localField: '_id',
    foreignField: 'parentComment'
});

commentSchema.virtual('childComments')
    .get(function (){
        return this._childComments;
    })
    .set(function (v){
        this._childComments = v;
    })
    

commentSchema.statics.createComment = function ({depth, postId, parentCommentId, authorId, data}) {
    const comment = new this({
        depth,
        post: postId,
        data: data,
        parentComment: parentCommentId,
        author: authorId,
        uploadDate: Date.now(),
    })
    return comment.save();
}

commentSchema.set('toObject', {virtuals: true});
commentSchema.set('toJSON', {virtuals: true});

const model = mongoose.model(`comment`,commentSchema, `comment`);
export default model;