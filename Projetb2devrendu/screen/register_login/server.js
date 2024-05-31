const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 80;

// Exemple de données utilisateurs, à remplacer par une base de données
const users = [
    { username: 'correctUsername', password: '$2b$10$e...hashedPassword...' } // mot de passe haché
];

// Middleware pour parser le JSON
app.use(express.json());

// Servir les fichiers statiques dans le dossier "qr-connect"
app.use('/qr-connect', express.static(path.join(__dirname, '../qr-connect')));

// Route de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                // Connexion réussie, redirection
                res.redirect('/qr-connect/index.html');
            } else {
                res.status(401).json({ message: 'Identifiants incorrects.' });
            }
        });
    } else {
        res.status(401).json({ message: 'Identifiants incorrects.' });
    }
});

// Route de registre
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({ message: 'Erreur lors de l\'enregistrement.' });
        } else {
            users.push({ username, password: hash });
            res.status(200).json({ message: 'Utilisateur enregistré avec succès.' });
        }
    });
});

// Route par défaut pour servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../qr-connect/index.html'));
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
