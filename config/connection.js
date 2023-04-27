const { connect, connection } = require('mongoose');
require('dotenv').config();

connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
