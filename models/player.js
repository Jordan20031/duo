const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: String,
    score: Number,
    gamesPlayed: Number
});

module.exports = mongoose.model('Player', playerSchema);
