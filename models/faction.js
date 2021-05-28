// HOYLRAM 19.05.2021
const mongoose = require('mongoose');

const factionSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    name: { type: String, required: true },
    type: { type: Number, required: true },
    leader: { type: String, default: null },
    hoodConfirm: { type: Boolean, default: false },
    systemConfirm: { type: Boolean, default: false },
    chatStatus: { type: Boolean, default: true },
    case: { type: Number, default: 0},
    caseLog: [],
    ranks: {},
    status: { type: Boolean, default: true }
})

const factionModel = new mongoose.model('factions', factionSchema)

module.exports = factionModel