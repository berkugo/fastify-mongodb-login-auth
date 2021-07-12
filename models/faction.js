// HOYLRAM 19.05.2021
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const factionSchema = new mongoose.Schema({
  id: { type: Number, default: 0 },
  name: { type: String, required: true },
  type: { type: Number, required: true },
  leader: { type: String, default: null },
  hoodConfirm: { type: Boolean, default: false },
  systemConfirm: { type: Boolean, default: false },
  chatStatus: { type: Boolean, default: true },
  case: { type: Number, default: 0 },
  caseLog: [],
  ranks: {},
  status: { type: Boolean, default: true },
});

factionSchema.plugin(autoIncrement.plugin, { model: 'factions', field: 'id' });
const factionModel = new mongoose.model('factions', factionSchema);

module.exports = factionModel;
