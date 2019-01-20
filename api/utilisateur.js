import mysql from 'mysql';
import bcrypt from 'bcryptjs'
import moment from 'moment';
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


/*export const connexionUtilisateur = (req, res) => {

        const erreur = {}

        connexion.query(RECUPERER_UTILISATEUR_, (err, rows, fields) => {

                    bcrypt.compare(password, user.password).then(isMatch => {
                            if (isMatch) {

                            })
                    };
                }*/

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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * TODO reactiver la fonction de vérification des input pour l'ajout utilisateur
 */
export const ajouterUtilisateur = (req, res) => {

    // const {
    //     erreurs,
    //     estValide
    // } = valideUtilisateurInput(req.body);

    /* 

        if (!estValide) {



            return res.status(400).json(erreurs);
            
        } else { */

    console.log("sdfdsfsdfd");
    const utilisateur = {}

    for (var key in req.body) {

        if (JSON.parse(JSON.stringify(req.body)).hasOwnProperty(key)) {

            utilisateur[key] = req.body[key]
        }

    }

    /* bcrypt.compare(password, user.password).then(isMatch => {
                        if (isMatch) {
*/
    utilisateur["date_creation_user"] = moment().format('YYYY/MM/D hh:mm:ss SSS')




    // connexion.query(AJOUTER_UTILISATEUR, utlisateur, (err, rows, fields) => {


    //     return res.json(rows);
    // })


    let sql = 'call ajouterUtilisateur(?,?,?,?,?,?,?,?)'
    connexion.query(sql, [utilisateur.prenom, utilisateur.nom, utilisateur.rang, utilisateur.adresse_mail, utilisateur.mot_de_passe, utilisateur.date_creation_user, utilisateur.url_avatar, utilisateur.lieu], (err, rows, fields) => {

        if (err) {
            return res.status(404).json(err);
        }

        return res.json(rows);
    })

}