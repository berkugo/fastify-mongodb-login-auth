// HOYLRAM 19.04.2021
const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    originalName: { type: String },
    owner: { type: String, default: null },
    onsale: { type: Boolean, default: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    locked: { type: Boolean, default: true },
    case: { type: Number, default: 0 },
    store: [],
    input: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
        z: { type: Number, default: 0 },
        d: { type: Number, default: 0 }
    },
    output: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
        z: { type: Number, default: 0 },
        d: { type: Number, default: 0 }
    },
    colshape: {},
    colshape2: {},
    status: { type: Boolean, default: true }
})

const houseModel = new mongoose.model('houses', houseSchema)

module.exports = houseModel