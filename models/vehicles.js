const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const vehicleSchema = new mongoose.Schema({
  id: { type: Number, default: 0 },
  modelHash: { type: String, required: true },
  ownerId: { type: String, required: true },
  position: { type: Object, default: {} },
  rotation: { type: Object, default: { x: 0, y: 0, z: 0 } },
  primaryColor: { type: String, default: '0', required: true },
  secondaryColor: { type: String, default: '0', required: true },
  plate: { type: String, required: true },
  insurance: { type: Number, default: 30 },
  faction: { type: Number, default: 0 },
  createdDate: { type: Number, default: Date.now },
  keys: {
    type: Object,
    default: {
      1: null,
      2: null,
      3: null,
    },
  },
});

vehicleSchema.plugin(autoIncrement.plugin, { model: 'vehicles', field: 'id' });
const vehicleModel = new mongoose.model('vehicles', vehicleSchema);

module.exports = vehicleModel;
