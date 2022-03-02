require('dotenv').config();
import mongoose from 'mongoose';
const connect = () => {
    mongoose.connect(
        `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'homepage',
        }
    );
}

mongoose.connection.once("open",()=>{
    console.log('Connected to mongodb');
});
mongoose.connection.on('error',(err)=>{
    console.log(err);
})

module.exports = connect;

