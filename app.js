const express  = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const staffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const path = require('path');

const app = express(); // permet de créer un serveur

mongoose.connect('mongodb+srv://elmnabhi:Hello00@cluster0.doybw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json()); // permet de parser les requêtes JSON
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', staffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;