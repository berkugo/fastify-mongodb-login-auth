const mongoose = require('mongoose');
const vehicleSchema = new mongoose.Schema({
    modelHash: { type: String, required: true },
    ownerId: { type: String, required: true },
    position: { type: Object, default: {} },
    primaryColor: { type: Object, default: {} },
    secondaryColor: { type: Object, default: {} }
})

const vehicleModel = new mongoose.model('vehicles', vehicleSchema)

module.exports = vehicleModel