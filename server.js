const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/unoGame', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Modèles
const Player = require('./models/player');

// Express App
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Carte
class Card {
    constructor(color, value) {
        this.color = color;
        this.value = value;
    }
}

// Initialisation
let players = {};
let currentPlayerIndex = 0;
let deck = [];
let discardPile = [];

// Fonctions utilitaires
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initializeDeck() {
    const colors = ['red', 'blue', 'green', 'yellow'];
    const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'skip', 'reverse', 'drawtwo'];

    for (let color of colors) {
        for (let value of values) {
            deck.push(new Card(color, value));
        }
    }

    shuffle(deck);
}

function dealCards() {
    for (let playerId in players) {
        for (let i = 0; i < 7; i++) {
            const card = deck.pop();
            players[playerId].hand.push(card);
        }
    }
}

function drawCard(player) {
    if (deck.length === 0) {
        deck = [...discardPile];
        discardPile = [];
        shuffle(deck);
    }

    const card = deck.pop();
    player.hand.push(card);
}

function moveFly() {
    io.emit('moveFly', { x: Math.random() * 800, y: Math.random() * 600 });
}

initializeDeck();

io.on('connection', (socket) => {
    console.log(`Joueur connecté: ${socket.id}`);
    
    players[socket.id] = new Player(socket.id, `Joueur ${Object.keys(players).length + 1}`);

    if (Object.keys(players).length >= 2 && deck.length === 108) {
        dealCards();
        io.emit('gameStart', { players, currentPlayerIndex });
    }

    socket.on('disconnect', () => {
        console.log(`Joueur déconnecté: ${socket.id}`);
        delete players[socket.id];
    });

    socket.on('playCard', (cardIndex) => {
        const player = players[socket.id];
        const card = player.hand[cardIndex];

        if (canPlayCard(card)) {
            discardPile.push(card);
            player.hand.splice(cardIndex, 1);

            currentPlayerIndex = (currentPlayerIndex + 1) % Object.keys(players).length;

            io.emit('cardPlayed', { playerId: socket.id, card, currentPlayerIndex });
        }
    });

    socket.on('drawCard', () => {
        const player = players[socket.id];
        drawCard(player);

        currentPlayerIndex = (currentPlayerIndex + 1) % Object.keys(players).length;

        io.emit('cardDrawn', { playerId: socket.id, currentPlayerIndex });
    });

    // Move the fly randomly
    setInterval(moveFly, 2000);
});

function canPlayCard(card) {
    const topCard = discardPile[discardPile.length - 1];
    return card.color === topCard.color || card.value === topCard.value;
}

// Routes API
app.post('/players', async (req, res) => {
    try {
        const player = new Player(req.body);
        await player.save();
        res.status(201).send(player);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/players', async (req, res) => {
    try {
        const players = await Player.find();
        res.send(players);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.patch('/players/:id', async (req, res) => {
    try {
        const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!player) {
            return res.status(404).send({ message: 'Joueur non trouvé' });
        }
        res.send(player);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.delete('/players/:id', async (req, res) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);
        if (!player) {
            return res.status(404).send({ message: 'Joueur non trouvé' });
        }
        res.send({ message: 'Joueur supprimé avec succès' });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Route pour la racine /
app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur de jeu de Uno !');
});

// Écoute du serveur
server.listen(3000, () => {
    console.log('Serveur en écoute sur le port 3000');
});
