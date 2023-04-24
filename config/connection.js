const { connect, connection } = require('mongoose');

connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
