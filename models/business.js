// HOYLRAM 19.04.2021
const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    name: {type: String, required: true},
    originalName: {type: String},
    owner: {type: String, default: null},
    onsale: {type: Boolean, default: true},
    price: {type: Number, required: true},
    originalPrice: {type: Number},
    loginPrice: {type: Number, default: 0},
    locked: {type: Boolean, default: true},
    case: {type: Number, default: 0},
    personel: [],
    input: {
        x: {type: Number, default: 0},
        y: {type: Number, default: 0},
        z: {type: Number, default: 0},
        d: {type: Number, default: 0}
    },
    output: {
        x: {type: Number, default: 0},
        y: {type: Number, default: 0},
        z: {type: Number, default: 0},
        d: {type: Number, default: 0}
    },
    colshape1: {},
    colshape2: {}
})

const businessModel = new mongoose.model('businesses', businessSchema)

module.exports = businessModel