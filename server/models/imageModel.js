import mongoose from 'mongoose';


const imageSchema = new mongoose.Schema({
    uri: {type: String, required: true},
    originalname: {type:String},
    isTemp: {type: Boolean, required: true},
    img: {
        data: Buffer,
        contentType: String,
    }
})

const model = mongoose.model(`image`,imageSchema, `image`);

export default model;
