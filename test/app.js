require('dotenv').config();
const mongoose = require('mongoose');


mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'homepage',
    }
);

const db = mongoose.connection;

db.once("open",()=>{
    console.log('Connected to mongodb');
});
db.on('error',(err)=>{
    console.log(err);
});

const postSchema = new mongoose.Schema({
    title: {type: String, required: true,},
    author: {type: String, required: true},
    uploadDate: {type: Date, required: true, default: new Date()},
    data: {type: String}
},{collection: 'post'})

let Post = mongoose.model('post',postSchema);

const search = async () => {
    let result = await Post.findOne({title: 'test'});
    return result;
}
search().then((res)=>{console.log(res)})



