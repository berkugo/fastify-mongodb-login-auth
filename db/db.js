
const mongoose = require('mongoose');
const url = "mongodb://xrpadmin:chr123321@altv.turnuvam.net:27017/xrp"
const autoIncrement = require('mongoose-auto-increment');

function createConnectionToDb(){
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
    });
    autoIncrement.initialize(db);

}
createConnectionToDb();

module.exports = createConnectionToDb