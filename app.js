const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const compression = require('compression');

const utilisateur = require('./route/utilisateur');
const evenement = require('./route/evenement');
const commentaire = require('./route/commentaire');
const idee = require('./route/idee');
const lieu = require('./route/lieu');
const aime = require('./route/aime');
const participer = require('./route/participer');
const notifier = require('./route/notifie');
const acheter = require('./route/achete');
const idee_aime = require('./route/aime_idee');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(compression());

app.use('/api/utilisateur/',utilisateur);
app.use('/api/evenement/',evenement);
app.use('/api/commentaire/', commentaire);
app.use('/api/idee/', idee);
app.use('/api/lieu/', lieu);
app.use('/api/aime/', aime);
app.use('/api/participer/', participer);
app.use('/api/notif/', notifier);
app.use('/api/acheter/', acheter);
app.use('/api/ideeaime', idee_aime)


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Listening...')
});