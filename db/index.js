const mongoose = require('mongoose');
const url = 'mongodb://xrpadmin:%5Exxejc%23M9k%40Qt63%214%21%2549%25E6y%269QM%24Q4@altv.turnuvam.net:27017/xrp?authSource=admin&authMechanism=SCRAM-SHA-256';
const autoIncrement = require('mongoose-auto-increment');

module.exports = (() => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  autoIncrement.initialize(db);
})();
