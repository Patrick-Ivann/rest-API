import express from "express"
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compression from 'compression'
import utilisateur from './routes/utilisateur';
import evenement from './routes/evenement';


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(compression());


app.use('/api/utilisateur/',utilisateur);
app.use('/api/evenement/', evenement);








const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Serveur demarré sur le port: ${port}`);
});