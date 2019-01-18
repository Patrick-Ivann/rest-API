import mysql from 'mysql';
import {
    RECUPERE_TOUS_LES_UTILISATEURS,
    RECUPERE_UTILISATEUR_PAR_ID,
    RECUPERE_UTILISATEUR_PAR_MAIL,
    AJOUTER_UTILISATEUR
} from './requetesSql';
import {
    validePhoto,
    valideUtilisateur,
    valideUtilisateurInput
} from '../validation/validationInput';

const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'root',
    database: "projet_web"
});

export const recupererTousLesUtilisateur = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERE_TOUS_LES_UTILISATEURS, (err, rows, fields) => {


        return res.json(rows);

    })


}

export const recupererUtilisateurParId = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERE_UTILISATEUR_PAR_ID, req.params.id, (err, rows, fields) => {


        return res.json(rows);

    })


}

export const recupererUtilisateurParMail = (req, res) => {

    const erreur = {}

    console.log("mail");

    connexion.query(RECUPERE_UTILISATEUR_PAR_MAIL, req.params.mail, (err, rows, fields) => {


        return res.json(rows);

    })


}


export const ajouterUtilisateur = (req, res) => {

    const {
        erreurs,
        estValide
    } = valideUtilisateurInput(req.body);



    if (!estValide) {



        return res.status(400).json(erreurs);

    } else {

        console.log("sdfdsfsdfd");
        const utilisateur = {}

        for (var key in req.body) {

            if (JSON.parse(JSON.stringify(req.body)).hasOwnProperty(key)) {

                utilisateur[key] = req.body[key]
            }

        }

        utilisateur["date_creation_user"] = moment().format('YYYY/MM/D hh:mm:ss SSS')



        connexion.query(AJOUTER_UTILISATEUR, utlisateur, (err, rows, fields) => {


            return res.json(rows);
        })


    }
}