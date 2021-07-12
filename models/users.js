const autoIncrement = require('mongoose-auto-increment');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  xid: { type: Number, default: 0 },
  userName: { type: String, required: true },
  userPassword: { type: String, required: true },
  characterName: { type: String, required: true },
  characterDetails: { type: Object, default: {} },
  online: { type: Boolean, default: false },
  firstLogin: { type: Boolean, default: true },
  money: { type: Number, default: 500 },
  admin: { type: Number, default: 0 },
  faction: {
    type: Object,
    default: {
      id: 0,
      rank: 0,
    },
  },
  ban: { type: Boolean, default: false },
  jail: { type: Number, default: 0 },
  spawnLocation: { type: Object, default: {} },
  fines: { type: Array, default: [] },
});
userSchema.plugin(autoIncrement.plugin, { model: 'users', field: 'xid' });
const userModel = new mongoose.model('users', userSchema);

module.exports = userModel;
