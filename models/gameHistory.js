const mongoose = require('mongoose');

const gameHistorySchema = new mongoose.Schema({
    playerId: mongoose.Schema.Types.ObjectId,
    date: Date,
    winner: String,
    players: [String]
});

module.exports = mongoose.model('GameHistory', gameHistorySchema);
