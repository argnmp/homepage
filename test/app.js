require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'homepage',
    }
)
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.collection('post').find().forEach((doc)=>console.log(doc))







