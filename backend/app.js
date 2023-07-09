const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

require("dotenv").config();

const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');

const dbServer = process.env.DB_SERVER;
const dbUserName = process.env.DB_USER_NAME;
const dbPassword = process.env.DB_PASSWORD;

const app = express();
mongoose.connect(`mongodb+srv://${dbUserName}:${dbPassword}@${dbServer}/?retryWrites=true&w=majority`,
    { useNewUrlParser: true,
       useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/books', bookRoutes);

module.exports = app;

