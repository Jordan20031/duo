# Projet DUO game - Guide d'Installation et d'Utilisation

![Bannière du Projet](https://www.bing.com/images/search?view=detailV2&ccid=yrBQp7MA&id=D93D0758F7000CD3B44B26BB4969B57B5D75C64B&thid=OIP.yrBQp7MAFwMmCZaryi98awAAAA&mediaurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.cab050a7b3001703260996abca2f7c6b%3frik%3dS8Z1XXu1aUm7Jg%26riu%3dhttp%253a%252f%252fpyramide54.p.y.pic.centerblog.net%252fo%252f04ad746d.jpg%26ehk%3dInI8OZzmfX0BFUf51C59nhP96fITXHSTJNltWLIb0GU%253d%26risl%3d%26pid%3dImgRaw%26r%3d0&exph=355&expw=474&q=oiseaux&simid=608055236871616591&FORM=IRPRST&ck=4CF017517760ABC103E25DBAE5FF8701&selectedIndex=1&itb=0)

Bienvenue dans ce guide détaillé pour installer et utiliser notre DUO. Suivez ces instructions pour configurer l'environnement sur votre PC et votre téléphone.

## Prérequis

- Un ordinateur avec accès à internet
- Un téléphone avec accès à internet
- Une connexion entre le PC et le téléphone

## Configuration sur le PC

### 1. Installer Ngrok

Ngrok est un outil qui permet de créer des tunnels sécurisés vers des serveurs locaux. Pour l'installer :

- Rendez-vous sur le site officiel de Ngrok : [https://ngrok.com/](https://ngrok.com/)
- Créez un compte si ce n'est pas déjà fait.
- Téléchargez Ngrok pour votre système d'exploitation.
- Décompressez le fichier téléchargé et placez-le dans un répertoire accessible (par exemple, `C:\ngrok\`).

### 2. Lancer Ngrok

Ouvrez une fenêtre de terminal ou de commande et exécutez :

```bash
ngrok http 8000
```

Notez l'URL générée par Ngrok, elle sera utilisée plus tard.

### 3. Installer Python (si ce n'est pas déjà fait)

Python est nécessaire pour exécuter le script de génération de QR codes. Pour l'installer :

- Rendez-vous sur le site officiel de Python : [https://www.python.org/downloads/](https://www.python.org/downloads/)
- Téléchargez et installez la version recommandée pour votre système d'exploitation.
- Assurez-vous que Python est ajouté à votre variable d'environnement PATH.

### 4. Modifier le code

Dans votre terminal, accédez au répertoire de votre projet et ouvrez l'éditeur de code :

```bash
code .
```

Dans le fichier concerné, remplacez le lien existant par celui fourni par Ngrok.

### 5. Générer le QR Code

Dans votre terminal, exécutez le script de génération de QR code :

```bash
python gen-qrcode.py
```

### 6. Aller dans Screen puis Register/Login

Accédez à l'interface utilisateur en ouvrant votre navigateur et en visitant l'URL fournie par Ngrok.

### 7. Lancer le serveur

Pour démarrer le serveur, exécutez :

```bash
node server.js
```

Le serveur écoute sur le port 8000.

## Configuration sur le téléphone

### 1. Installer Expo Go

Expo Go est une application qui permet de lancer des projets Expo sur votre téléphone. Pour l'installer :

- Rendez-vous sur le Play Store (Android) ou l'App Store (iOS) et recherchez "Expo Go".
- Installez l'application.

### 2. Lancer l'application mobile

Dans le terminal de votre PC, accédez au répertoire de votre projet mobile, puis :

```bash
cd mobile_app
npx expo start
```

Scannez le QR code affiché avec l'application Expo Go sur votre téléphone.

### 3. Lancer l'application

Une fois le QR code scanné, l'application mobile se lance automatiquement.

### 4. Scanner le QR code

Utilisez l'application mobile pour scanner le QR code généré précédemment.

## Conclusion

Et voilà ! Vous avez maintenant configuré et lancé votre projet de génération et de lecture de QR codes. Profitez de cette application et AMUSEZ-VOUS BIEN !

Pour toute question ou assistance, n'hésitez pas à consulter la documentation ou à contacter le support technique.

---

Ce guide est conçu pour être précis et facile à suivre, mais n'hésitez pas à adapter les instructions à votre environnement spécifique si nécessaire. Bonne chance et bon amusement !