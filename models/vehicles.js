const mongoose = require('mongoose');
const vehicleSchema = new mongoose.Schema({
    modelHash: { type: String, required: true },
    ownerId: { type: String, required: true },
    position: { type: Object, default: {} },
    primaryColor: { type: String, default: '0', required: true },
    secondaryColor: { type: String, default: '0', required: true },
    plate: { type: String, required: true },
    insurance: { type: Number, default: 30 },
    penalties: { type: Array, default: [] },
    createdDate: { type: Number, default: Date.now },
    keys: {
        type: Object, default: {
            1: null,
            2: null,
            3: null
        }
    }
})

const vehicleModel = new mongoose.model('vehicles', vehicleSchema)

module.exports = vehicleModel