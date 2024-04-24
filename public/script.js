const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Définition des classes
class Card {
    constructor(color, value) {
        this.color = color;
        this.value = value;
    }
}

class Player {
    constructor(id) {
        this.id = id;
        this.hand = [];
    }
}

// Initialisation des variables
let players = {};
let currentPlayerIndex = 0;
let deck = [];
let discardPile = [];

// Mélange le paquet de cartes
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Initialise le paquet de cartes
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

// Distribue 7 cartes à chaque joueur
function dealCards() {
    for (let playerId in players) {
        for (let i = 0; i < 7; i++) {
            const card = deck.pop();
            players[playerId].hand.push(card);
        }
    }
}

// Pioche une carte du paquet
function drawCard(player) {
    if (deck.length === 0) {
        deck = [...discardPile];
        discardPile = [];
        shuffle(deck);
    }

    const card = deck.pop();
    player.hand.push(card);
}

// Initialise le jeu
initializeDeck();

// Gestion des connexions Socket.io
io.on('connection', (socket) => {
    console.log(`Joueur connecté: ${socket.id}`);
    
    players[socket.id] = new Player(socket.id);

    // Distribue les cartes aux joueurs
    if (Object.keys(players).length >= 2 && deck.length === 108) {
        dealCards();
        io.emit('gameStart', { players, currentPlayerIndex });
    }

    // Gestion du déconnecté
    socket.on('disconnect', () => {
        console.log(`Joueur déconnecté: ${socket.id}`);
        delete players[socket.id];
    });

    // Jouer une carte
    socket.on('playCard', (cardIndex) => {
        const player = players[socket.id];
        const card = player.hand[cardIndex];

        if (canPlayCard(card)) {
            discardPile.push(card);
            player.hand.splice(cardIndex, 1);

            // Mettre à jour l'indice du joueur actuel
            currentPlayerIndex = (currentPlayerIndex + 1) % Object.keys(players).length;

            io.emit('cardPlayed', { playerId: socket.id, card, currentPlayerIndex });
        }
    });

    // Piocher une carte
    socket.on('drawCard', () => {
        const player = players[socket.id];
        drawCard(player);

        // Mettre à jour l'indice du joueur actuel
        currentPlayerIndex = (currentPlayerIndex + 1) % Object.keys(players).length;

        io.emit('cardDrawn', { playerId: socket.id, currentPlayerIndex });
    });
});

// Vérifie si la carte peut être jouée
function canPlayCard(card) {
    const topCard = discardPile[discardPile.length - 1];
    return card.color === topCard.color || card.value === topCard.value;
}

server.listen(3000, () => {
    console.log('Serveur en écoute sur le port 3000');
});
