const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userPassword: { type: String, required: true },
    characterName: { type: String, required: true },
    characterDetails: { type: Object, default: {} },
    online: { type: Boolean, default: false },
    firstLogin: { type: Boolean, default: false },

})

const userModel = new mongoose.model('users', userSchema)

module.exports = userModel