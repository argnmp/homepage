require('dotenv').config();
import mongoose from 'mongoose';
const connect = async () => {
    const db = await mongoose.connect(
        `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'homepage',
        }
    ).then(()=>mongoose.db);
    mongoose.connection.once("open",()=>{
        console.log('Connected to mongodb');
    });
    mongoose.connection.on('error',(err)=>{
        console.log(err);
    })
    return db;
}



module.exports = connect;

