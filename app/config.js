var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/data/db', { server: {reconnectTries: Number.MAX_VALUE} });

var db = mongoose.connection;

module.exports = db;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Mongodb connection is open');
});

module.exports = db;

      // link.string('url', 255);
      // link.string('baseUrl', 255);
      // link.string('code', 100);
      // link.string('title', 255);
      // link.integer('visits');

      // user.string('username', 100).unique();
      // user.string('password', 100);
