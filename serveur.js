import express from "express"
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compression from 'compression'


import utilisateur from './routes/utilisateur';
import evenement from './routes/evenement';
import photo from './routes/photo';
import produit from './routes/produit';
import achete from './routes/achete'
import aime from './routes/aime';
import aime_idee from './routes/aime_idee';
import commentaire from './routes/commentaire'
import idee from './routes/idee'
import lieu from './routes/lieu';
import notifie from './routes/notifie'
import participer from './routes/participer';
import signaler from './routes/signaler';

/**
 * !AJOUTER UNE METHODE DE LOG POUR LE SQL ET LES REQUETES HTTP
 */

const app = express()

app.use('/static', express.static('photos'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(morgan('dev'));
app.use(compression());


app.use('/api/utilisateur/', utilisateur);
app.use('/api/evenement/', evenement);
app.use("/api/photo/", photo);
app.use("/api/aimer/", aime);
app.use("/api/produit/", produit);
app.use("/api/achete/", achete);
app.use("/api/aime_idee", aime_idee);
app.use("/api/commentaire", commentaire);
app.use("/api/idee", idee);
app.use("/api/lieu", lieu);
app.use("/api/notifie", notifie);
app.use("/api/participer", participer);
app.use("/api/signaler", signaler);



app.all('*', (req, res, next) => {

    const erreurs = {}

    res.sendStatus(404)
});








const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Serveur demarré sur le port: ${port}`);
});