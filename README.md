# Jeu de Uno Multi-joueurs avec Node.js, Socket.io et MongoDB

Ce projet est une application de jeu de Uno multi-joueurs développée avec Node.js, Socket.io pour la communication en temps réel entre le serveur et le client, et MongoDB pour la gestion des données des joueurs, scores et historique des parties.

## Fonctionnalités

- **Jeu de Uno en temps réel** : Jouez au jeu de Uno en temps réel avec d'autres joueurs.
- **Gestion des joueurs** : Inscription, connexion et gestion des profils des joueurs.
- **Historique des parties** : Enregistrement des parties jouées avec les détails des joueurs et du gagnant.
- **Communication en temps réel** : Utilisation de Socket.io pour une communication bidirectionnelle entre le serveur et le client.
  
## Technologies utilisées

- **Node.js** : Plateforme de développement JavaScript côté serveur.
- **Express** : Framework web pour Node.js.
- **Socket.io** : Bibliothèque JavaScript pour la communication en temps réel.
- **MongoDB** : Base de données NoSQL pour le stockage des données.
- **Mongoose** : ODM (Object Document Mapper) pour Node.js et MongoDB.

## Installation

1. **Cloner le dépôt**
   ```
   git clone https://github.com/votre-utilisateur/uno-game.git
   ```
   
2. **Installer les dépendances**
   ```
   cd uno-game
   npm install
   ```

3. **Configurer MongoDB**
   - Installer MongoDB si ce n'est pas déjà fait.
   - Créer une base de données `unoGame` et configurer la connexion dans `server.js`.

## Configuration

- **Connexion à MongoDB** : Configurez la connexion à MongoDB dans `server.js` en remplaçant `mongodb://localhost:27017/unoGame` par votre URL de connexion MongoDB.

## Démarrage

```
npm start
```

L'application sera accessible à l'adresse `http://localhost:3000`.

## Routes API

- **Créer un joueur** : `POST /players`
- **Lire tous les joueurs** : `GET /players`
- **Mettre à jour un joueur** : `PATCH /players/:id`
- **Supprimer un joueur** : `DELETE /players/:id`
