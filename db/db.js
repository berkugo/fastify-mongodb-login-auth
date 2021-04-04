
const mongoose = require('mongoose');
const url = "mongodb://xrpadmin:chr123321@157.230.101.140:27017/xrp"

function createConnectionToDb(){
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
    });
    
}

module.exports = createConnectionToDb