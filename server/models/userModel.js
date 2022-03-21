import mongoose from 'mongoose';
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    password: {type:String, required: true},
    level: {type:Number, required: true},
    regDate: {type:Date, required: true, default: Date.now()},
})

//return promise
userSchema.statics.localRegister = function ({email, name, password}) {
    const account = new this({
        email,
        name,
        level: 3, 
        password: bcrypt.hashSync(password, 10)
    })
    return account.save();
}
userSchema.statics.findByEmail = function (email) {
    return this.findOne({email});
}

userSchema.methods.validatePassword = function (password)  {
    const result = bcrypt.compareSync(password, this.password);
    return result;
}
const model = mongoose.model(`user`, userSchema, `user`);

export default model;