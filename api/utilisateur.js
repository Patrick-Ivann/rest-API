import mysql from 'mysql';
import bcrypt from 'bcryptjs'
import moment from 'moment';
import {

    CONNEXION_UTILISATEUR,
    RECUPERER_TOUS_LES_UTILISATEURS,
    RECUPERER_UTILISATEUR_PAR_ID,
    RECUPERER_UTILISATEUR_PAR_MAIL
} from './requetesSql';

import {
    AJOUTER_UTILISATEUR
} from "./procedures_sql";
import {
    validePhoto,
    valideUtilisateur,
    valideUtilisateurInput,
    valideConnexionInput
} from '../validation/validationInput';
import connexion from '../functions/connexion';




export const recupererTousLesUtilisateur = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERER_TOUS_LES_UTILISATEURS, (err, rows, fields) => {


        return res.json(rows);

    })


}

export const recupererUtilisateurParId = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERER_UTILISATEUR_PAR_ID, req.params.id, (err, rows, fields) => {


        return res.json(rows);
    });


};



export const recupererUtilisateurParMail = (req, res) => {

    connexion.query(RECUPERER_UTILISATEUR_PAR_MAIL, req.params.mail, (err, rows, fields) => {
        return res.json(rows);
    });




}

export const connexionUtilisateur = (req, res) => {

    const {
        erreurs,
        isValide
    } = valideConnexionInput(req.body);

    if (!isValide) {

        return res.status(400).json(errors);

    }

    const email = req.body.email;
    const mot_de_passe = req.body.mot_de_passe;




    connexion.query(CONNEXION_UTILISATEUR, email, (err, rows, fields) => {

            if (err) {

                return res.status(404).json(err);
            }


            bcrypt.compare(mot_de_passe, row.mot_de_passe).then(correct => {
                if (correct) {




                    // on a trouvé le mec on peut donc le donner un token

                    const payload = {
                        id: rows.id_user,
                        id_lieu: rows.id_lieu_lieu,
                        avatar: rows.url_avatar

                    }
                    jwt.sign(payload, keys.secretOrKey, {
                        expiresIn: "30min"
                    }, (err, token) => {
                        return res.json({
                            connecte: true,
                            token: "Bearer " + token
                        });
                    });

                } else {
                    erreur.password = 'mauvais mot de passe';
                    return res.status(404).json(erreur);
                }
            })




        })



        .catch(err => console.log(err));




};



/*

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * TODO reactiver la fonction de vérification des input pour l'ajout utilisateur
 
export const ajouterUtilisateur = (req, res) => {

    // const {
    //     erreurs,
    //     estValide
    // } = valideUtilisateurInput(req.body);

    /* 

        if (!estValide) {



            return res.status(400).json(erreurs);
            
        } else { 

    const utilisateur = {}

    for (var key in req.body) {

        if (JSON.parse(JSON.stringify(req.body)).hasOwnProperty(key)) {

            utilisateur[key] = req.body[key]
        }

    }


    utilisateur["date_creation_user"] = moment().format('YYYY/MM/D hh:mm:ss SSS')







    connexion.query(AJOUTER_UTILISATEUR, [utilisateur.prenom, utilisateur.nom, utilisateur.rang, utilisateur.adresse_mail, utilisateur.mot_de_passe, utilisateur.date_creation_user, utilisateur.url_avatar, utilisateur.lieu], (err, rows, fields) => {

        if (err) {
            return res.status(404).json(err);
        }

        return res.json(rows);
    })

}

*/