"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

const connect = () => {
  _mongoose.default.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'homepage'
  });
};

_mongoose.default.connection.once("open", () => {
  console.log('Connected to mongodb');
});

_mongoose.default.connection.on('error', err => {
  console.log(err);
});

module.exports = connect;