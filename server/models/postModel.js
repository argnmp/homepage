import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';

/*
const categoryData = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, '../metadata/category.json')
));
*/


const postSchema = new mongoose.Schema({
    uri: {type: String, required: true,},
    title: {type: String, required: true,},
    author: {type: String, required: true},
    uploadDate: {type: Date, required: true, default: new Date()},
    category: {type:String, required: true},
    data: {type: String}
});
const model = mongoose.model(`post`,postSchema, `post`);
//not seperate posts
/*
let model = {};

let modelGenerator = (list)=>{
    for(let key in list){
        if(typeof(list[key])=== 'object'){
            modelGenerator(list[key]);
        } 
        else{
            if(list[key]===true)
                model[key] = mongoose.model(`${key}`, postSchema, `${key}`);
            else
                continue;
        }
    }
}
modelGenerator(categoryData);
*/

export default model;
